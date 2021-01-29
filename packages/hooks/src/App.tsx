import React from 'react'

import './App.scss'

import StateCounter from './state-hook/Counter'
import EffectCounter from './effect-hook/Counter'

function App() {
  return (
    <div className="app">
      <div className="demo">
        <h1>useState</h1>
        <StateCounter />
      </div>
      <div className="demo">
        <h1>useEffect</h1>
        <EffectCounter />
      </div>
    </div>
  )
}

export default App
