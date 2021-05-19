
<p align="center">
  <img width="320" height="320" src="genji.png" />
</p>


Language: 中文简体 | [EN](https://github.com/xieyezi/monia-cli)


<code>![visitors](https://visitor-badge.glitch.me/badge?page_id=xieyezi.genji)</code>
<code>![bundle size](https://img.shields.io/badge/bundle--size-2k-blue)</code>
<code>![npm-version](https://img.shields.io/npm/v/genji-es)</code>
<code>![coverage](https://img.shields.io/badge/coverage-100%25-blue)</code>



`genji` 是一个轻巧的基于 `@vue-reactivity` 开发的状态管理框架.

### 为什么被称作 genji ?
灵感来自于游戏`《守望先锋》` 的游戏角色：`源氏`。

源氏可以用致命而准确的手里剑重创敌人，他的高科技武士刀可以用来反弹敌人的远程攻击，或是对敌人施展一次快速攻击。

所以 `genji` 是快速的、敏捷的、准确的！

```
npm install genji-es
```

### 创建一个Store

你的 `Store` 是一个基于`compostion-api` 的 `hook`！您可以在其中添加任何内容：普通类型，对象，函数。 `set` 函数会将他们合并为一个 `Store`。

```ts
import { create } from 'genji-es'

const useStore = create((set, get) => ({
  count: 0,
  increase: () => set(state => ({ count: state.count + 1 })),
  resetCount: () => set({ count: 0 })
}))
```
### 然后就可以在组件里面使用它了，就是如此简单!

在你的组件中使用这个 `hook`，取出你想要的值，组件将在更新 `state` 之后重新渲染。

```ts
<template>
  <p>count is: {{ count }}</p>
  <button @click="increase">count++</button>
</template>
....
const { count, increase } = useStore(state => ({
   count: state.count,
   increase: state.increase
}))
```

### 从Store中取值

你可以按照自己喜欢的方式取出你想要的值。

如果你想一个一个取出来:

```ts
const count = useStore(state => state.count)
const genji = useStore(state => state.genji)
```

如果你想用对象的方式取值（类似`vuex mapState`）:

```ts
// Object pick, re-renders the component when either state.count or state.genji change
const { count, genji } = useStore((state) => ({
  count: state.count,
  genji: state.genji
}))
```

如果你想用数组的方式取值（类似`react hooks`）:

```ts
// Array pick, re-renders the component when either state.count or state.genji change
const [count, genji] = useStore(state => [state.count, state.genji])
```

甚至你还可以不带任何参数，直接取出来:
```ts
// uses the store with no args
const { count, increase } = useStore()
```

所有取值方式都是如此简单！这一切都取决于你怎么创建你的`选择器`。

### 从多个Store中取值

由于你可以创建任意数量的 `Store`，因此你可以随意组合各个`Store` 里面的值。

```ts
import useUserStore from '../store/user'
import useOrder from '../store/order'

const name = useUserStore(state => state.name)
const orders = useOrder(state => state.orders)

```

### 带有计算属性的选择器

在 `vue` 中，通常来说，一般都建议利用 `computed`来构造你的选择器。

> 但是需要注意，此时从 `Store` 中选择的值需要用 `unref` 包装，因为状态的值由 `Proxy` 代理。


```ts
const countDouble = useStore(state =>computed(()=>unref( state.count) * 2))
```

如果`选择器`不在组件中使用，则也可以在组件外部定义它。但是，当使用来自 `Store` 的选择值时，也需要使用 `unref` 进行包裹，或者你也可以直接利用 `.value` 来使用它。

```ts
const selector = state => state.hero
const hero = useStore(selector)

// warpped with unref()
console.log(unref(hero))

// or you can use like this:
console.log(hero.value)

```

### 变更Store

`genji` 提供 `set` 函数来更新“状态”。就像这样：

```ts
const useStore = create((set, get) => ({
  count: 0,
  increase: () => set(state => ({ count: state.count + 1 })),
}))

const { count, increase } = useStore(state => ({
  count: state.count,
  increase: state.increase
}))
```
接着你就可以使用 `increase` 函数去改变 `count`。

### Async actions

> 对于异步任务，建议使用 `async/await` 来处理。

```ts
const useStore = create((set, get) => ({
   userInfo: {},
   getUserInfo: async () => {
      const res = await fetch(pond)
      set({ userInfo: res })
   }
}))
```
### 在 `action` 中读取 `Store`

在一个 `action` 执行过程中，如果你想取出 `Store` 的某些值，你可以通过 `get` 钩子来访问`Store`。

```ts
const useStore = create((set, get) => ({
  hero: 'genji',
  action: () => {
    const hero = get().hero
    // ...
  }
})
```

### TypeScript支持

```ts
// 可以使用 `type`
type State = {
  count: number
  increase: (by: number) => void
}

// 或者 `interface`
interface State {
  count: number
  increase: (by: number) => void
}

// 然后所有的类型都会被正确推导
const useStore = create<State>(set => ({
  count: 0,
  increase: (by) => set(state => ({ count: state.count + by })),
}))
```

喜欢你能喜欢`genji`~

> api usage inspired by zustand, thanks a lot!