import { useState } from 'react'

const useField = (type) => {
  const [value, setValue] = useState('')

  const handleChange = (event) => {
    setValue(event.target.value)
  }

  const reset = () => {
    setValue('')
  }

  return {
    type,
    value,
    handleChange,
    reset
  }
}

export default useField
