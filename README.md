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



### Lists and Keys

#### List

通过 `map()` 函数映遍历组中元素。

#### Key

key 帮助 React 识别哪些元素改变了，比如添加或删除。

key 会传递信息给 React，但不会传递给组件。如果组件中需要使用 key 属性的值，需要用其他属性名显式传递这个值：

```jsx
const content = posts.map((post) => (
	<Post
    key={post.id}
    id={post.id}
    title={post.title} />
))
```

此处，`Post` 组件可以读出 `posts.id`，但不能读出 `posts.key`。

#### Embedding map() in JSX

JSX 允许在打括号中嵌入任何表达式，所以可以内联 `map()` 返回的结果：

```jsx
function NumberList(props) {
  const numbers = props.numbers;
  return (
    <ul>
      {numbers.map((number) => (
        <ListItem key={number.toString()}
          				 value={number} />
      ))}
    </ul>
  )
}
```



### Forms

#### Controlled Components

在 HTML 中，表单元素（如 `<input>`、`<textarea>` 和 `select` 通常自己维护 state，并根据用户输入进行更新。而在 React 中，**可变状态（mutable state）**通常保存在组件的 state 属性中，并且只能通过使用 `setState()` 来更新。

渲染表单的 React 组件还控制着用户输入过程中表单发生的操作。被 React 以这种方式控制取值的表单元素叫做**“受控组件”**。

#### The textarea Tag

在 React 中，`<textarea>` 使用 `value` 属性定义其文本。

#### The select Tag

React 不会使用 `selected` 属性，通过在根 `select` 标签上使用 `value` 属性。

>**⚠️: 可以将数组传递到 `value` 属性中，以支持在 `select` 标签中选择多个选项：**
>
>```jsx
><select multiple={true} value={['B', 'C']}
>```

#### The file input Tag

```jsx
<input type="file" />
```

因为它的 value 只读，所以它是 React 中的一个**非受控**组件。

#### Handling Multiple Inputs

为元素添加 `name` 属性，并让处理函数根据 `event.target.name` 的值选择要执行的操作。



### Lifting State Up

在 React 中，将多个组件中需要共享的 state 向上移动到他们的最近共同父组件中，便可实现共享 state。

> 因为 `props` 是只读的，所以由 `props` 传入的状态无法通过 `setState()` 修改。
>
> 通过使用“受控组件”解决，与 DOM 中的 `<input>` 接受的 `value` 和 `onChange` 一样。



### Composition vs Inheritance

#### Containment

使用 `children` prop 将组件的子组件传递到渲染结果中：

```jsx
function FancyBorder(props) {
  return (
  	<div className={'FancyBorder FancyBorder-' + props.color}>
    	{props.children}
    </div>
  )
}
```

这使得别的组件可以通过 JSX 嵌套，将任意组件作为子组件传递给它们。

```jsx
function WelcomeDialog() {
  return (
  	<FancyBorder color="blue">
      <h1 className="Dialog-title">
        Welcome
      </h1>
      <p className="Dialog-message">
        Thank you for visiting our spacecraft!
      </p>
    </FancyBorder>
  )
}
```

组件可以接受任意 props，包括基本数据类型，React 元素以及函数。



## Advanced

### Context

#### API

##### `React.createContext`

```jsx
const MyContext = React.createContext(defaultValue);
```

**只有**当组件所处的树中没有匹配到 Provider 时，其 `defaultValue` 参数才会生效。

> 将 `undefined` 传递给 Provider 的 value 时，消费组件的 `defaultValue` 不会生效。

##### `Context.Provider`

```jsx
<MyContext.Provider value={/* 某个值 */}></MyContext.Provider>
```

Provider 接受一个 `value` 属性，传递给消费组件。一个 Provider 可以和多个消费组件有对应关系。多个 Provider 也可以嵌套使用，里层的会覆盖外层的数据。

当 Provider 的 `value` 值发生变化时，它内部的所有消费组件都会重新渲染。

* Provider 及其内部 consumer 组件都不受制于 `shouldComponentUpdate` 函数，因此当 consumer 组件在其祖先组件退出更新的情况下也能更新。

##### `Class.contentType`

挂载在 class 上的 `contextType` 属性会被重赋值为一个由 `React.createContext()` 创建的 Context 对象。

使用 `public class fields` 语法可以通过 `static` 类属性来初始化 `contextType`。

##### `Context.Consumer`

```jsx
<MyContext.Consumer>
  {value => /* 基于 context 值进行渲染 */}
</MyContext.Consumer>
```

##### `Context.displayName`

context 对象接受一个名为 `displayName` 的 property，类型为字符串。

```jsx
const MyContext = React.createContext(/* some value */)
MyContext.displayName = 'MyDisplayName';

<MyContext.Provider></MyContext.Provider>
<MyContext.Consumer></MyContext.Consumer>
```



