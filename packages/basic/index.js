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

/*
 * =======================
 *  Conditional Rendering
 * =======================
 */
function UserGreeting(props) {
  return <h1>Welcome back!</h1>
}

function GuestGreeting(props) {
  return <h1>Please sign up.</h1>
}

function Greeting(props) {
  const isLoggedIn = props.isLoggedIn
  if (isLoggedIn) {
    return <UserGreeting />
  }
  return <GuestGreeting />
}

function LoginButton(props) {
  return <button onClick={props.onClick}>Login</button>
}

function LogoutButton(props) {
  return <button onClick={props.onClick}>Logout</button>
}
class LoginControl extends React.Component {
  constructor(props) {
    super(props)

    this.state = { isLoggedIn: false }

    this.handleLoginClick = this.handleLoginClick.bind(this)
    this.handleLogoutClick = this.handleLogoutClick.bind(this)
  }

  handleLoginClick() {
    this.setState({ isLoggedIn: true })
  }

  handleLogoutClick() {
    this.setState({ isLoggedIn: false })
  }

  render() {
    const isLoggedIn = this.state.isLoggedIn
    // * Element Variables
    // let button
    // if (isLoggedIn) {
    //   button = <LogoutButton onClick={this.handleLogoutClick} />
    // } else {
    //   button = <LoginButton onClick={this.handleLoginClick} />
    // }

    return (
      <div>
        <Greeting isLoggedIn={isLoggedIn} />
        {
          // button
          // * Inline If-Else with Conditional Operator
          isLoggedIn ? (
            <LogoutButton onClick={this.handleLogoutClick} />
          ) : (
            <LoginButton onClick={this.handleLoginClick} />
          )
        }
      </div>
    )
  }
}

ReactDOM.render(<LoginControl />, document.getElementById('login-control'))

function LogicalAndOperator(props) {
  const count = 0
  return <div>{count && <h1>Message: {count}</h1>}</div>
}

ReactDOM.render(
  <LogicalAndOperator />,
  document.getElementById('logical-and-operator')
)

function WarningBanner(props) {
  if (!props.warn) {
    // * This does not affect the firing of the component's lifecycle methods.
    // * For instance `componentDidUpdate` will still be called.
    return null
  }

  return <div className="warning">Warning!</div>
}

class Page extends React.Component {
  constructor(props) {
    super(props)

    this.state = { showWarning: true }

    this.handleToggleClick = this.handleToggleClick.bind(this)
  }

  handleToggleClick() {
    this.setState((state) => ({
      showWarning: !state.showWarning
    }))
  }

  render() {
    return (
      <div>
        <WarningBanner warn={this.state.showWarning} />
        <button onClick={this.handleToggleClick}>
          {this.state.showWarning ? 'Hide' : 'Show'}
        </button>
      </div>
    )
  }
}

ReactDOM.render(<Page />, document.getElementById('prevent-component-render'))

/*
 * ================
 *  Lists and Keys
 * ================
 */
const numbers = [1, 2, 3, 4, 5]
const doubled = numbers.map((number) => number * 2)
console.log(doubled)
// Print: [2, 4, 6, 8, 10]

function NumberList(props) {
  const numbers = props.numbers
  const listItems = numbers.map((number) => (
    <li key={number.toString()}>{number}</li>
  ))

  return <ul>{listItems}</ul>
}

ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('lists')
)

function Blog(props) {
  const sidebar = (
    <ul>
      {props.posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  )
  const content = props.posts.map((post) => (
    <div key={post.id}>
      <h3>{post.title}</h3>
      <p>{post.content}</p>
    </div>
  ))

  return (
    <div>
      {sidebar}
      <hr />
      {content}
    </div>
  )
}

const posts = [
  { id: 1, title: 'Hello World', content: 'Welcome to learning React!' },
  { id: 2, title: 'Installation', content: 'You can install React from npm.' }
]

ReactDOM.render(<Blog posts={posts} />, document.getElementById('list-key'))

