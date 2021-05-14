import { reactive } from '@vue/reactivity'

export type State = object
// types inspired by setState from React, see:
// https://github.com/DefinitelyTyped/DefinitelyTyped/blob/6c49e45842358ba59a508e13130791989911430d/types/react/v16/index.d.ts#L489-L495

export type StateSelector<T extends State, U> = (state: T) => U
export type EqualityChecker<T> = (state: T, newState: T) => boolean
export type StateListener<T> = (state: T, previousState: T) => void
export type StateSliceListener<T> = (slice: T, previousSlice: T) => void
export type PartialState<T extends State, K extends keyof T = keyof T> =
	| (Pick<T, K> | T)
	| ((state: T) => Pick<T, K> | T)
export interface Subscribe<T extends State> {
	(listener: StateListener<T>): () => void
	<StateSlice>(
		listener: StateSliceListener<StateSlice>,
		selector?: StateSelector<T, StateSlice>,
		equalityFn?: EqualityChecker<StateSlice>
	): () => void
}

export type SetState<T extends State> = {
	<K extends keyof T>(partial: PartialState<T, K>, replace?: boolean): void
}
export type GetState<T extends State> = () => T
export type Destroy = () => void
export interface StoreApi<T extends State> {
	setState: SetState<T>
	getState: GetState<T>
	subscribe: Subscribe<T>
	destroy: Destroy
}
export type StateCreator<T extends State, CustomSetState = SetState<T>> = (
	set: CustomSetState,
	get: GetState<T>,
	api: StoreApi<T>
) => T

export default function create<TState extends State>(
	createState: StateCreator<TState> | StoreApi<TState>
) {}
