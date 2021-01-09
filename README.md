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



