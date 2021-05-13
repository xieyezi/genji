import { effect, reactive, readonly } from '@vue/reactivity'
import { useRef, useMemo, useEffect } from 'react'
import { useCheckIsObj } from './util'

export function createStore(initState: Object) {
	const isEmptyObj = useCheckIsObj(initState)
	if (!isEmptyObj) {
		const stateRef = useRef(initState)
		const state = useMemo(() => reactive(stateRef.current), [stateRef.current])
		return state
	} else {
		throw console.warn('initState must be obj')
	}
}
