import React, { useEffect, RefObject } from 'react'
import { tabbable } from 'tabbable'

interface Props {
  children: React.ReactNode | any
  focusFirst?: boolean
}

export default function FocusTrap({ children, focusFirst = false }: Props) {
  const root: RefObject<any> = React.useRef()
  const anchor: RefObject<any> = React.useRef(document.activeElement)

  const returnFocus = () => {
    if (anchor) {
      anchor.current.focus()
    }
  }

  const trapFocus = () => {
    if (root.current) {
      root.current.focus()
      if (focusFirst) {
        selectFirstFocusableEl()
      }
    }
  }

  const selectFirstFocusableEl = () => {
    let match = false
    let end = 60
    let i = 0

    const timer = setInterval(() => {
      if (!match !== i > end) {
        match = !!tabbable(root.current).length
        if (match) {
          tabbable(root.current)[0].focus()
        }
        i = i + 1
      } else {
        clearInterval(timer)
      }
    }, 100)
  }

  useEffect(() => {
    setTimeout(trapFocus, 20)
    return () => {
      returnFocus()
    }
  }, [root, children])

  return React.createElement('div', {
    ref: root,
    children,
    className: 'outline-none focus-trap',
    tabIndex: -1,
  })
}
