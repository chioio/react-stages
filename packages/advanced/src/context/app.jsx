import React from 'react'

import { ThemeContext, themes } from './theme-context'
import ThemeTogglerButton from './theme-toggler-button'

// const ThemeContext = React.createContext('light')

// function Toolbar(props) {
//   return <ThemeButton onClick={props.changeTheme}>Change Theme</ThemeButton>
// }

class ContextApp extends React.Component {
  constructor(props) {
    super(props)

    this.toggleTheme = () => {
      this.setState((state) => ({
        theme: state.theme === themes.dark ? themes.light : themes.dark
      }))
    }

    // State also contains the updater function so it will
    // be passed down into the context provider
    this.state = {
      theme: themes.light,
      toggleTheme: this.toggleTheme
    }
  }

  render() {
    // The entire state is passed to the provider
    return (
      <ThemeContext.Provider value={this.state}>
        {/* <Toolbar changeTheme={this.toggleTheme} /> */}
        <Content />
      </ThemeContext.Provider>
    )
  }
}

function Content() {
  return (
    <div>
      <ThemeTogglerButton />
    </div>
  )
}

// class ThemeButton extends React.Component {
//   static contextType = ThemeContext
//   render() {
//     return <Button theme={this.context} />
//   }
// }
//
// function Button(props) {
//   return <button>{props.theme}</button>
// }

export default ContextApp
