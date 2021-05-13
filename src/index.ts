// import { create } from './create'

import { GetState, SetState, State, StoreApi } from './type'

export type StateCreator<T extends State, CustomSetState = SetState<T>> = (
	set: CustomSetState,
	get: GetState<T>,
	api: StoreApi<T>
) => T

export function create<TState extends State>(
	createState: StateCreator<TState> | StoreApi<TState>
) {
	console.log(createState)
}
