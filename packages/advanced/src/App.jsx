import logo from './logo.svg'
import './App.css'
import ContextApp from './context/app'
import ErrorBoundaryApp from './error-boundary/app'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <ContextApp />
        <ErrorBoundaryApp />
        <img src={logo} className="App-logo" alt="logo" />
      </header>
    </div>
  )
}

export default App
