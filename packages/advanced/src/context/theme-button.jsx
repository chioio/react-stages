import React from 'react'
import { ThemeContext } from './theme-context'

class ThemeButton extends React.Component {
  render() {
    let props = this.props
    let theme = this.context
    return <button {...props} style={{ backgroundColor: theme.background }} />
  }
}

ThemeButton.contextType = ThemeContext

export default ThemeButton
