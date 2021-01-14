import logo from './logo.svg'
import './App.css'
import ContextApp from './context/app'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <ContextApp />
        <img src={logo} className="App-logo" alt="logo" />
      </header>
    </div>
  )
}

export default App
