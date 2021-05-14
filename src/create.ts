import { ref } from '@vue/reactivity'

import { useCheckFn } from './util'

export type State = object

export type StateSelector<T extends State, U> = (state: T) => U

export type EqualityChecker<T> = (state: T, newState: T) => boolean

export type PartialState<T extends State, K extends keyof T = keyof T> =
	| (Pick<T, K> | T)
	| ((state: T) => Pick<T, K> | T)

export type SetState<T extends State> = {
	<K extends keyof T>(partial: PartialState<T, K>, replace?: boolean): void
}

export type GetState<T extends State> = () => T

export interface StoreApi<T extends State> {
	setState: SetState<T>
	getState: GetState<T>
}

export type StateCreator<T extends State, CustomSetState = SetState<T>> = (
	set: CustomSetState,
	get: GetState<T>,
	api: StoreApi<T>
) => T

export default function create<TState extends State>(
	createState: StateCreator<TState>
): StoreApi<TState> {
	let state: TState

	const setState: SetState<TState> = (partial, replace) => {
		const nextState =
			typeof partial === 'function'
				? (partial as (state: TState) => TState)(state)
				: partial
		if (nextState !== state) {
			// const previousState = state
			state = replace
				? (nextState as TState)
				: Object.assign({}, state, nextState)
		}
	}

	// const getState: GetState<TState> = () => {
	// 	let stateWithOutReactivity: TState = Object.create(state)
	// 	console.log('state', state)
	// 	Object.keys(stateWithOutReactivity).forEach((key) => {
	// 		if (useCheckFn(stateWithOutReactivity[key]))
	// 			stateWithOutReactivity[key] = state[key]
	// 		else stateWithOutReactivity[key] = stateWithOutReactivity[key].value
	// 	})
	// 	console.log('stateWithOutReactivity', stateWithOutReactivity)
	// 	console.log('state', stateWithOutReactivity)
	// 	return stateWithOutReactivity
	// }

	const getState: GetState<TState> = () => state

	const api = { setState, getState }

	const warpStateWithReactive = (stateWithOutReactivity: TState) => {
		Object.keys(stateWithOutReactivity).forEach((key) => {
			if (!useCheckFn(stateWithOutReactivity[key]))
				stateWithOutReactivity[key] = ref(stateWithOutReactivity[key])
		})
		return stateWithOutReactivity
	}

	state = warpStateWithReactive(createState(setState, getState, api))
	return api
}
