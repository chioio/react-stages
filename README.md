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
