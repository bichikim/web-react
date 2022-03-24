import {useState} from 'react'
export const useSignal = () => {
  const [signal, setSignal] = useState(false)

  return () => {
    setSignal(!signal)
  }
}
