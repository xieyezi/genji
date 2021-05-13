import { reactive } from '@vue/reactivity'
import { useCheckIsObj } from './util'

export function create(initState: Object) {
	const isEmptyObj = useCheckIsObj(initState)
	if (!isEmptyObj) {
		const state = reactive(initState)
		return state
	} else {
		throw console.warn('initState must be obj')
	}
}
