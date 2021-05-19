
<p align="center">
  <img width="320" height="320" src="genji.png" />
</p>


<code>![visitors](https://visitor-badge.glitch.me/badge?page_id=xieyezi.genji)</code>
<code>![bundle-size](https://img.shields.io/badge/bundle--size-2k-blue)</code>
<code>![npm-version](https://img.shields.io/badge/npm-v1.0.0-blue)</code>


genji is A small vue state management framewok by vue3 reactivity.

### Why calls genji ?
It's inspired by Overwatch.

Genji flings precise and deadly Shuriken at his targets, and uses his technologically-advanced katana to deflect projectiles or deliver a Swift Strike that cuts down enemies.

So genji is fast, agile and accurate!



```
npm install genji-es
```

### Create Store

Your store is a hook base on compostion-api! You can put anything in it: primitives, objects, functions. The set function merges state.

```ts
import { create } from 'genji-es'

const useStore = create((set, get) => ({
  count: 0,
  increase: () => set(state => ({ count: state.count + 1 })),
  resetCount: () => set({ count: 0 })
}))
```
### Then use your vue components, and that's it!


Use the hook in your components, Select your state and the component will re-render on changes.

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

### Selecting multiple state slices

You can get state sliece in the way you like. 


If you want to pick it out one by one:

```ts
const count = useStore(state => state.count)
const genji = useStore(state => state.genji)
```

If you want pick it by Object, like `vuex mapState`:

```ts
// Object pick, re-renders the component when either state.count or state.genji change
const { count, genji } = useStore((state) => ({
  count: state.count,
  genji: state.genji
}))
```

If you want pick it lick by Array,  like `react hooks`:

```ts
// Array pick, re-renders the component when either state.count or state.genji change
const [count, genji] = useStore(state => [state.count, state.genji])
```

Even you can pick it without args:
```ts
// uses the store with no args
const { count, increase } = useStore()
```

All pick is so random and simple! It's all up to you.

### Fetching from multiple stores

Since you can create as many stores as you like, forwarding results to succeeding selectors is as natural as it gets.

```ts
import useUserStore from '../store/user'
import useOrder from '../store/order'

const name = useUserStore(state => state.name)
const orders = useOrder(state => state.orders)

```

### Memoizing selectors
It is generally recommended to memoize selectors with `computed`. 
> But you need to pay attention, the value pick from the state needs to be wrapped with `unref`, because the value of the state is proxied by the Proxy.


```ts
const countDouble = useStore(state =>computed(()=>unref( state.count) * 2))
```

If a selector doesn't in components to reactivity, you can define it outside the components. But when you to use value of pick from the state, you need to be wrapped with `unref` too.

```ts
const selector = state => state.hero
const hero = useStore(selector)

// warpped with unref()
console.log(unref(hero))

// or you can use like this:
console.log(hero.value)

```

### Overwriting state

genji provide `set` function to update  `state`. just like this:

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
then you can use `increase` function  to change state.

### Async actions

```ts
const useStore = create((set, get) => ({
   userInfo: {},
   getUserInfo: async () => {
      const res = await fetch(pond)
      set({ userInfo: res })
   }
}))
```
### Read from state in actions

`set` allows fn-updates `set(state => result)`, but you still have access to state outside of it through `get`.

```ts
const useStore = create((set, get) => ({
  hero: 'genji',
  action: () => {
    const hero = get().hero
    // ...
  }
})
```

### TypeScript

```ts
// You can use `type`
type State = {
  count: number
  increase: (by: number) => void
}

// Or `interface`
interface State {
  count: number
  increase: (by: number) => void
}

// And it is going to work for both
const useStore = create<State>(set => ({
  count: 0,
  increase: (by) => set(state => ({ count: state.count + by })),
}))
```

Hope you enjoy it!
