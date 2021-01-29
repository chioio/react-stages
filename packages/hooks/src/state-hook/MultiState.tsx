import React, { useState } from 'react'

/**
 * Multi state use `useState` hook
 */
export default function () {
  const [age, setAge] = useState(42)
  const [fruit, setFruit] = useState('banana')
  const [todos, setTodos] = useState([{ text: 'Learn Hooks' }])
}
