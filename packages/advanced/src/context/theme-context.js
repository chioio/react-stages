import React from 'react'

export const themes = {
  light: {
    foreground: '#000000',
    background: '#eeeeee'
  },
  dark: {
    foreground: '#ffffff',
    background: '#222222'
  }
}

// Make sure the shape of the default value passed to 
// createContext matches the shape that the consumers expect!
export const ThemeContext = React.createContext(
  // themes.dark
  {
    theme: themes.dark,
    toggleTheme: () => {}
  }
)
