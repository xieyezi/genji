// import { effect, reactive } from '@vue/reactivity'

// type EffectFn = () => any

// type EffectList = Array<EffectFn>

// let state = reactive({
// 	count: 0
// })

// const effectList: EffectList = []

// const listener1 = () => {
// 	console.log(state.count)
// }

// const listener2 = () => {
// 	console.log(state.count * 2)
// }

// const listener3 = () => {
// 	console.log(state.count * 3)
// }

// effectList.push(listener1)
// effectList.push(listener2)
// effectList.push(listener3)

// effect(() => {
// 	for (const effect of effectList) effect()
// })

// state.count++
// state.count++

import { effect, reactive, readonly } from '@vue/reactivity'
import { useRef, useMemo, useEffect } from 'react'
import { createStore } from './create'
import { useForceUpdate } from './util'

export function useStore(initState: Object) {
	const state = createStore(initState)
	return state
}
