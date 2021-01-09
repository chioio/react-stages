// Hello World
/*
 * =============
 *  Hello World
 * =============
 */
const element1 = <h1>Hello, world!</h1>
ReactDOM.render(element1, document.getElementById('hello'))

/*
 * =====
 *  JSX
 * =====
 */
function formatName(user) {
  return user.firstName + ' ' + user.lastName
}

function getGreeting(user) {
  if (user) {
    return <h1>Hello, {formatName(user)}!</h1>
  }
  return <h1>Hello, Stranger.</h1>
}

const user = {
  firstName: 'Tenn',
  lastName: 'Chio'
}

const element2 = <div tabIndex="0"></div>
const element3 = <img src={user.avatarUrl}></img>
const element4 = (
  <div>
    <h1>Hello!</h1>
    <h2>Good to see you here.</h2>
  </div>
)

ReactDOM.render(getGreeting(user), document.getElementById('jsx'))

/*
 * ====================
 *  Rendering Elements
 * ====================
 */
function tick() {
  const element = (
    <div>
      <h1>This is a timer example.</h1>
      <h2>It is {new Date().toLocaleTimeString()}.</h2>
    </div>
  )
  ReactDOM.render(element, document.getElementById('clock'))
}

// Via `setInterval()` to repeat `tick()` function,
// repeat calling `render()` to render DOM.
setInterval(tick, 1000)

/*
 * ======================
 *  Components and Props
 * ======================
 */
// Components and Props
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>
}

function App() {
  return (
    <div>
      <Welcome name="Tom" />
      <Welcome name="Sally" />
      <Welcome name="Tenn" />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('component'))

function Avatar(props) {
  return (
    <img className="Avatar" src={props.user.avatarUrl} alt={props.user.name} />
  )
}

function UserInfo(props) {
  return (
    <div className="UserInfo">
      <Avatar user={props.user} />
      <div className="UserInfo-name">{props.user.name}</div>
    </div>
  )
}

function Comment(props) {
  return (
    <div className="Comment">
      <UserInfo user={props.author} />
      <div className="Comment-text">{props.text}</div>
      <div className="Comment-date">{formatDate(props.date)}</div>
    </div>
  )
}

/*
 * =====================
 *  State and Lifecycle
 * =====================
 */
function Clock2(props) {
  return (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {props.date.toLocaleTimeString()}</h2>
    </div>
  )
}

function tick2() {
  ReactDOM.render(
    <Clock2 date={new Date()} />,
    document.getElementById('clock2')
  )
}

setInterval(tick2, 1000)

class Clock3 extends React.Component {
  constructor(props) {
    super(props)

    this.state = { date: new Date() }
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000)
  }

  componentWillUnmount() {
    clearInterval(this.timerID)
  }

  tick() {
    this.setState({
      date: new Date()
    })
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}</h2>
      </div>
    )
  }
}

ReactDOM.render(<Clock3 />, document.getElementById('clock3'))

/*
 * =================
 *  Handling Events
 * =================
 */
class Toggle extends React.Component {
  constructor(props) {
    super(props)

    this.state = { isToggleOn: true }

    // * This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    this.setState((state) => ({
      isToggleOn: !state.isToggleOn
    }))
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.isToggleOn ? 'ON' : 'OFF'}
      </button>
    )
  }
}

ReactDOM.render(<Toggle />, document.getElementById('toggle-btn'))

// class fields syntax
class LoggingButton extends React.Component {
  // * This syntax ensures `this` is bound within handleClick.
  handleClick = () => {
    console.log('this is: ', this)
  }

  render() {
    return <button onClick={this.handleClick}>Click me</button>
  }
}
// or (not recommended)
class LoggingButton2 extends React.Component {
  handleClick() {
    console.log('this is: ', this)
  }

  render() {
    // * This syntax ensures `this` is bound within handleClick
    return <button onClick={() => this.handleClick()}>Click me</button>
  }
}

