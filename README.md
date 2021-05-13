a vue state management framewok by vue3 reactivity api



```
npm install genji
```

### Create Store

Your store is a hook base on compostion-api! You can put anything in it: primitives, objects, functions. The set function merges state.

```ts
const useUserInfo = create((set, get) => ({
	count: 0,
    increase: () => set(state => ({ count: state.count + 1 })),
    resetCount: () => set({ count: 0 })
}))
```
### Then bind your vue components, and that's it!


Use the hook anywhere, no providers needed. Select your state and the component will re-render on changes.

```ts
const { info, getUserInfo } = useUserInfo((store) => ({
    info: store.info,
    getUserInfo: store.getUserInfo
}))
```
