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



