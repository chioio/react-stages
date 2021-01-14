import { ThemeContext } from './theme-context'

function ThemeTogglerButton() {
  return (
    // The Theme Toggler Button receives not only the theme
    // but also a toggleTheme function from the context
    <ThemeContext.Consumer>
      {({ theme, toggleTheme }) => (
        <button
          onClick={toggleTheme}
          style={{ backgroundColor: theme.background }}
        >
          Toggle Theme
        </button>
      )}
    </ThemeContext.Consumer>
  )
}

export default ThemeTogglerButton
