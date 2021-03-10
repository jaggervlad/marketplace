import React, { useState, useEffect, useContext, createContext } from 'react'
import Router from 'next/router'

import firebase from './firebase'
import { mapUserData } from '@utils/mapUserData'
import { createUser } from './db-fs'

const authContext = createContext()

export function AuthProvider({ children }) {
  const auth = useProvideAuth()
  return <authContext.Provider value={auth}>{children}</authContext.Provider>
}

export const useAuth = () => {
  return useContext(authContext)
}

function useProvideAuth() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  async function handleUser(rawUser) {
    if (rawUser) {
      const user = await mapUserData(rawUser)
      const { token, ...userWithoutToken } = user

      createUser(user.id, userWithoutToken)
      setUser(user)
      setLoading(false)
      return user
    } else {
      setUser(false)
      setLoading(false)
      return false
    }
  }

  function signinWithEmailPassword(redirect, data) {
    const { email, password } = data
    setLoading(true)
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        handleUser(res.user)
        Router.push(redirect)
      })
      .catch((err) => {
        throw new Error('Error!', err.message)
      })
  }

  function signupWithEmailPassword(redirect, data) {
    const { email, password } = data
    setLoading(true)
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        handleUser(res.user)
        Router.push(redirect)
      })
      .catch((err) => {
        throw new Error('Error!', err.message)
      })
  }

  function signout() {
    Router.push('/')

    return firebase
      .auth()
      .signOut()
      .then(() => handleUser(false))
  }

  useEffect(() => {
    const cancelAuthListener = firebase.auth().onIdTokenChanged(handleUser)
    return () => {
      cancelAuthListener()
    }
  }, [])

  return {
    user,
    loading,
    signout,
    signupWithEmailPassword,
    signinWithEmailPassword,
  }
}
