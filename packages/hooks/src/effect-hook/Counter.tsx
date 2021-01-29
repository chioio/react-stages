import React from 'react'
import { useState, useEffect } from 'react'

export default function EffectCounter() {
  const [count, setCount] = useState(0)
  const [words, setWords] = useState('')
  useEffect(() => {
    setWords(() => `You clicked ${count} times`)
  })

  const handleClick = () => {
    setCount(count + 1)
  }

  return (
    <div>
      <p>{words}</p>
      <button onClick={handleClick}>Click me</button>
    </div>
  )
}
