import dynamic from 'next/dynamic'
import cn from 'classnames'
import s from './Layout.module.css'
import { useRouter } from 'next/router'
import React, { FC } from 'react'
import { Navbar, Footer } from '@components/common'
import { useAcceptCookies } from '@lib/hooks/useAcceptCookies'
import { Sidebar, Button, Modal, LoadingDots } from '@components/ui'

import LoginView from '@components/auth/LoginView'
import { useUI } from '@components/ui/context'

const Loading = () => (
  <div className="w-80 h-80 flex items-center text-center justify-center p-3">
    <LoadingDots />
  </div>
)

const dynamicProps = {
  loading: () => <Loading />,
}

const SignUpView = dynamic(
  () => import('@components/auth/SignUpView'),
  dynamicProps
)

const ForgotPassword = dynamic(
  () => import('@components/auth/ForgotPassword'),
  dynamicProps
)

const FeatureBar = dynamic(
  () => import('@components/common/FeatureBar'),
  dynamicProps
)

const Layout: FC = ({ children }) => {
  const {
    displaySidebar,
    displayModal,
    closeSidebar,
    closeModal,
    modalView,
  } = useUI()
  const { acceptedCookies, onAcceptCookies } = useAcceptCookies()
  const { locale = 'en-US' } = useRouter()

  return (
    <div className={cn(s.root)}>
      <Navbar />
      <main className="fit">{children}</main>
      <Footer />

      <Modal open={displayModal} onClose={closeModal}>
        {modalView === 'LOGIN_VIEW' && <LoginView />}
        {modalView === 'SIGNUP_VIEW' && <SignUpView />}
        {modalView === 'FORGOT_VIEW' && <ForgotPassword />}
      </Modal>

      <FeatureBar
        title="This site uses cookies to improve your experience. By clicking, you agree to our Privacy Policy."
        hide={acceptedCookies}
        action={
          <Button className="mx-5" onClick={() => onAcceptCookies()}>
            Accept cookies
          </Button>
        }
      />
    </div>
  )
}

export default Layout
