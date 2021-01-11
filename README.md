# Stages of React learning

## Basic

### JSX Introducing

Babel会把JSX转译成一个名为 `React.createElement()` 函数的调用。

```jsx
const element = (
	<h1 className="greeting">
    Hello, world!
  </h1>
)
// 等效
const element = React.createElement(
	'h1',
  {className: 'gretting'},
  'Hello, world!'
)
// 实际创建(React元素)
const element = {
  type: 'h1',
  props: {
    className: 'greeting',
    children: 'Hello, world!'
  }
}
```



### Rendering Elements

与浏览器DOM元素不同，React元素是创建开销极小的普通对象。

React元素是不可变的对象。一旦被创建，将无法更改它的子元素或者属性。



### Components and Props

组件，从概念上类似于JavaScript函数。它接受任意的入参（"props"），并返回用于描述页面展示内容的React元素。

#### Function and Class Components

**function** component:

```jsx
function Welcome(props) {
  return <h1>Hello, {props, name}</h1>
}
```

**class** component:

```jsx
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>
  }
}
```

#### Rendering a Component

```jsx
const element = <Welcome name="Tenn Chio" />
```

当React元素为用户自定义组件时，它会将JSX所有接收的属性（attribute）以及子组件（children）转换为单个对象（"props"）传递给组件。

> **⚠️: 组件名称必须以大写字母开头。**
>
> React 会将以小写字母开头的组件视为原生DOM标签。

#### Composing Components

```jsx
function App() {
  return (
  	<div>
      <Welcome name="Tom" />
      <Welcome name="Sally" />
      <Welcome name="Tenn"
    </div>
  )
}
```

#### Props are Read-Only

组件无论是使用函数声明函数通过 class 声明，**都绝不能修改自身的 props**。



### State and Lifecycle

State 与 Props 类似，但 state 是私有的，并且完全受控于当前组件。

#### Converting a Function to a Class

1. 创建同名的 **ES6 class**，并且继承于 `React.Component`。
2. 添加一个空的 `render()` 方法。
3. 将函数体移动到 `render()` 方法之中。
4. 在 `render()` 方法中使用 `this.props` 替换 `props`。
5. 删除剩余的空函数声明。

每次组件更新时 `render` 方法都会被调用。

#### Adding Local State to a Class

```jsx
class Clock extends React.Component {
  constructor(props) {
    super(props)
    this.state = { date: new Date() }
  }
  
  render() {
    return (
      ...
    )
  }
}
```

#### Adding Lifecycle Methods to a Class

在具有许多组件的应用程序中，当组件被销毁时释放所占用的资源是非常重要的。

**挂载（mount）**：`componentDidMount()`

**卸载（unmount）**：`componentWillUnmount()`

尽管 `this.props` 和 `this.state` 是 React 本身设置的，且都拥有特殊的含义，但是我们可以想 class 中随意添加不参与的**数据流**。

```jsx
componentDidMount() {
  // 数据流
  this.timerID = ...
}
```

#### Using State Correctly

##### Do Not Modify State Directly

```jsx
// Wrong
this.state.comment = 'Hello';
// Correct
this.setState({ comment: 'Hello' })
```

构造函数是唯一可以给 `this.state` 赋值的地方。

##### State Updates May Be Asynchronous

出于性能考虑，React可能会把多个 `setState()` 调用合并成一个调用。

因为 `this.props` 和 `this.state` 可能会异步更新，所以你不要依赖他们的值来更新下一个状态。

```jsx
// Wrong
this.setState({
  counter: this.state.counter + this.props.increment
})
```

解决这个问题，可以让 `setState()` 接收一个**函数**而不是一个对象。

```jsx
// Crrect
this.setState((state, props) => ({
  counter: state.counter + props.increment
}))
this.setState(function(state, props) {
  return {
    counter: state.counter + props.increment
  }
})
```

> **问**: 为什么通过将上一个 `state` 和此次更新被应用时的 `props` 作为参数的函数传入 `setState()` 就可以解决可能会异步更新的 `this.props` 和 `this.state` ？
>
> **原因**：通过函数作为参数操作后返回一个新的 state，而不是直接操作 state 和 props。

##### State Updates are Merged

当调用 `setState()` 的时候，React会把提供的对象合并到当前的 state。

```jsx
constructor(props) {
  super(props)
  this.state = {
    posts: [],
    comments: []
  }
}
// 分别调用 `setState()` 来单独更新
componentDidMount() {
  fetchPosts().then(response => {
    this.setState({
      posts: response.posts
    })
  })
  
  fetchComments().then(response => {
    this.setState({
      comment: response.comments
    })
  })
}
```

##### The Data Flows Down

不管是父组件或是子组件都无法知道某个组件是有状态的还是无状态的，并且也不关心它是函数组件还是 class 组件。

在 React 应用中，组件是有**状态组件**还是**无状态组件**属于组件实现的细节，它可能会随着时间的推移而改变。我们可以在**有状态的组件**中使用**无状态的组件**，也可在**无状态的组件**中使用**有状态的组件**。



### Handling Events

在 React 中不能通过返回 `false` 的方式阻止默认行为。必须显式的使用  `preventDefault`。

```jsx
function ActionLink() {
  function handleClick(e) {
    e.preventDefault()
    console.log('The link was clicked.')
  }
  
  return (
  	<a href="#" onClick={ handleClick }>
    	Click me
    </a>
  )
}
```

> **⚠️: class 的方法默认不会绑定 `this`。**



### Conditional Rendering

#### Element Variables

```jsx
render() {
  if (isLoggedIn) {
  	button = <LogoutButton onClick={this.handleLogoutClick} />
	} else {
  	button = <LoginButton onClick={this.handleLoginClick} />
	}
  
  return (
  	<div>
    	<Greeting isLogedIn={isLoggedIn} />
      {button}
    </div>
  )
}
```

#### Inline If with Logical && Operator

```jsx
render() {
  const count = 0;
  return (
  	<div>
    	{ count && <h1>Messages: {count}</h1> }
    </div>
  )
}
```

#### Inline If-Else with Conditional Operator

```jsx
render() {
  const isLoggedIn = this.state.isLoggedIn
  return (
  	<div>
      The user is <b> {isLoggedIn ? 'currently' : 'not'}</b> logged in.
    </div>
  )
}
```

#### Preventing Component from Rendering

可以让 `render` 方法直接返回 `null`，而不进行任何渲染；这样并不影响组件的生命周期。



