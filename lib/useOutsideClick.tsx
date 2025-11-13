import { useEffect } from 'react'

export default function useOutsideClick(ref: any, handler: () => void) {
  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (!ref?.current) return
      if (!ref.current.contains(e.target)) handler()
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [ref, handler])
}
