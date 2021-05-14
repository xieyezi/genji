import { reactive } from '@vue/reactivity'
import { useCheckFn } from './util'

export type State = object
// types inspired by setState from React, see:
// https://github.com/DefinitelyTyped/DefinitelyTyped/blob/6c49e45842358ba59a508e13130791989911430d/types/react/v16/index.d.ts#L489-L495

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
			const previousState = state
			state = replace
				? (nextState as TState)
				: Object.assign({}, state, nextState)
		}
	}

	const getState: GetState<TState> = () => state

	const api = { setState, getState }

	const warpStateWithReactive = (stateWithOutReactivity) => {
		console.log(stateWithOutReactivity)
		Object.keys(stateWithOutReactivity).forEach((key) => {
			if (!useCheckFn(stateWithOutReactivity[key]))
				stateWithOutReactivity[key] = reactive(stateWithOutReactivity[key])
		})

		console.log(stateWithOutReactivity)
	}

	warpStateWithReactive(createState(setState, getState, api))
	return api
}

interface userState extends State {
	count: number
	increase: () => void
	removeAll: () => void
}
const useStore = create<userState>((set, get) => ({
	count: 0,
	increase: () => set((state) => ({ count: state.count + 1 })),
	removeAll: () => set({ count: 0 })
}))
