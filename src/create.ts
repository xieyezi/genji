import { ref } from '@vue/reactivity'

import { useCheckFn } from './util'

export type State = object

export type StateSelector<T extends State, U> = (state: T) => U

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

	const setState: SetState<TState> = partial => {
		const stateWithOutReactive = getStateWithOutReactive()

		const nextState = useCheckFn(partial)
			? (partial as (state: TState) => TState)(stateWithOutReactive)
			: partial
		const targetKey = Object.keys(nextState)[0]
		if (Object.keys(state).includes(targetKey))
			state[targetKey].value = nextState[Object.keys(nextState)[0]]
	}

	const getState: GetState<TState> = () => state

	const api = { setState, getState }

	const warpStateWithReactive = (stateWithOutReactivity: TState) => {
		Object.keys(stateWithOutReactivity).forEach(key => {
			if (!useCheckFn(stateWithOutReactivity[key]))
				stateWithOutReactivity[key] = ref(stateWithOutReactivity[key])
		})
		return stateWithOutReactivity
	}

	const getStateWithOutReactive: GetState<TState> = () => {
		let stateWithOutReactivity = Object.create(state)

		Object.keys(state).forEach(key => {
			if (useCheckFn(state[key])) stateWithOutReactivity[key] = state[key]
			else stateWithOutReactivity[key] = state[key].value
		})
		return stateWithOutReactivity
	}

	state = warpStateWithReactive(
		createState(setState, getStateWithOutReactive, api)
	)
	return api
}
