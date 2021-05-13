
<p align="center">
  <img width="320" height="320" src="genji.png" />
</p>



genji is A small vue state management framewok by vue3 reactivity.

### Why calls genji ?
It's inspired by Overwatch.
>>>
Genji flings precise and deadly Shuriken at his targets, and uses his technologically-advanced katana to deflect projectiles or deliver a Swift Strike that cuts down enemies.
>>>

>>>
So genji is fast, agile and accurate!
>>>


```
npm install genji
```

### Create Store

Your store is a hook base on compostion-api! You can put anything in it: primitives, objects, functions. The set function merges state.

```ts
import create from 'genji'

const useUserInfo = create((set, get) => ({
    count: 0,
    increase: () => set(state => ({ count: state.count + 1 })),
    resetCount: () => set({ count: 0 })
}))
```
### Then bind your vue components, and that's it!


Use the hook anywhere, no providers needed. Select your state and the component will re-render on changes.

```ts
const { info, increase } = useUserInfo((store) => ({
    info: store.info,
    increase: store.increase
}))
```
