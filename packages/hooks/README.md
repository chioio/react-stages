# Introducing Hooks

### What is a Hook?

Hook 是一些可以让我们能够在**函数**组件里“钩入” React state 及 lifecycle 等特性的函数。

（Hook 不能在 class 组件中使用）

可以创建自定义的 Hook 来复用不同组件之间的状态逻辑。

### Rules of Hooks

Hook 就是 JavaScript 函数，但是使用它们会有两个额外的规则：

* 只能在**函数最外层**调用 Hook。不能在循环、条件判断或着子函数中调用。
* 只能在 **React 的函数组件**中调用 Hook。不要在其他 JavaScript 函数中调用。（可在自定义 Hook 中调用 Hook）

### Custom Hooks

解决组件之间重用一些状态的逻辑问题。

非 Hook 通过 HOC 和 render props 解决组件状态重用逻辑。

## `useState`

通过在函数组件里调用 `useState` 来给组件添加一些内部 state。React 会在重复渲染时保留这个 state。`useState` 会返回一对值：**当前**状态和一个让我们更新它的函数，我们能够在事件处理函数中或其他一些地方调用这个函数。

`useState` 类似于 class 组件的 `this.setState`，但是它不会把新的 state 和旧的 state 进行合并。

`useState` 唯一的参数就是初始 state。

## `useEffect`

`useEffect` 就是一个 Effect Hook，给函数组件增加了操作副作用的能力。

与 class 组件中的 `componentDidMount`、`componentDidUpdate` 和 `componentWillUnmount` 具有相同的用途，可以将其看作是这三个函数的组合。

### Effects without Cleanup

只想在 **React 更新 DOM 之后运行一些额外的代码**。如发送网络请求，手动变更 DOM，记录日志，这些都是常见的无需清除的操作。

> **NOT**
>
> 与 `componentDidMount` 或 `componentDidUpdate` 不同，使用 `useEffect` 调度的 effect 不会阻塞浏览器更新屏幕，这使得应用看起来响应更快。

### Effects with Cleanup

有一些副作用是需要清除的，比如**订阅外部数据源**。这种情况下，清除工作是非常重要的，可以防止引起**内存泄漏**！

**effect 中返回一个函数**是 effect 可选的**清除机制**。每个 effect 都可以返回一个清除函数。

**React 会在组件卸载的时候**执行清除操作。

## `useContext`

不使用组件嵌套就可以订阅 React 的 Context。

## `useReducer`

通过 reducer 来管理组件本地的复杂 state。

## Rules of Hooks

### Only Call Hooks at the Top Level

**不要在循环，条件或嵌套函数中调用 Hook**，确保总是在 React 函数的最顶层调用它们。

**Only Call Hooks from React Functions**

**不要在普通的 JavaScript 函数中调用 Hook**。但可以：

* 在 React 的函数组件中调用 Hook
* 在自定义的 Hook 中调用其他 Hook

### Explanation

只要 Hook 的调用顺序在多次渲染之间保持一致，React 就能正确的将内部 state 和对应的 Hook 进行关联。

## Custom Hook

通过自定义 Hook，可以将组件逻辑提取掉可重用的函数中。

### Extracting a Custom Hook

**自定义 Hook 是一个函数，其名称以 “use” 开头，函数内部可以调用其他的 Hook。

#### Example

```js
import { useState, useEffect } from 'react'

function useFriendStatus(friendID) {
  const [isOnline, setIsOnline] = useState(null)
  
  useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline)
    }
    
    ChatAPI.subscribeToFriendStatus(friendID, handleStatusChange)
    
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(friendID, hadnleStatusChange)
    }
  })
  
  return isOline
}
```

### Using a Custom Hook

#### Example

```jsx
function FriendStatus(props) {
  const isOnline = useFriendStatus(props.friend.id)
  
  if (isOnline === null) {
    return 'Loading...'
  }
  return isOnline ? 'Online' : 'Offline'
}

function FriendListItem(props) {
  const isOnline = useFriendStats(props.friend.id)
  
  return (
  	<li style={{ clolor: isOnline ? 'green' : 'black' }}>
    	{props.friend.name}
		</li>
  )
}
```

