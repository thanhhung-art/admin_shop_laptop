import { useEffect, useRef, useState } from 'react'

function useLocation() {
  const [pathname, setPathname] = useState("")

  useEffect(() => {
    if (window) setPathname(window.location.pathname)
  }, [])

  return { pathname: pathname }
}

export default useLocation