'use client'
import { useEffect, useState } from 'react'

function useLocation() {
  const [pathname, setPathname] = useState("")

  useEffect(() => {
    if (window) setPathname(window.location.pathname)
  }, [])

  return { pathname }
}

export default useLocation