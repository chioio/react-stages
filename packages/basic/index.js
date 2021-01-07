// Hello World
const element1 = <h1>Hello, world!</h1>
ReactDOM.render(element1, document.getElementById('hello'))

// JSX
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

