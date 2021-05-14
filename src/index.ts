// import { create } from './create'

import createImpl, {
	GetState,
	SetState,
	State,
	StoreApi,
	StateSelector,
	EqualityChecker
} from './create'

export type StateCreator<T extends State, CustomSetState = SetState<T>> = (
	set: CustomSetState,
	get: GetState<T>,
	api: StoreApi<T>
) => T

export interface UseStore<T extends State> {
	(): T
	<U>(selector: StateSelector<T, U>, equalityFn?: EqualityChecker<U>): U
	setState: SetState<T>
	getState: GetState<T>
}

export function create<TState extends State>(
	createState: StateCreator<TState> | StoreApi<TState>
): UseStore<TState> {
	console.log(createState)
	const storeApi: StoreApi<TState> =
		typeof createState === 'function' ? createImpl(createState) : createState
	console.log(storeApi)

	const useStore: any = <StateSlice>(
		selector: StateSelector<TState, StateSlice> = storeApi.getState as any
	) => {}

	return useStore
}
