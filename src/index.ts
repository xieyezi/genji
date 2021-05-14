// import { create } from './create'

import createImpl, {
	GetState,
	SetState,
	State,
	StoreApi,
	StateSelector
} from './create'

export type StateCreator<T extends State, CustomSetState = SetState<T>> = (
	set: CustomSetState,
	get: GetState<T>,
	api: StoreApi<T>
) => T

export function create<TState extends State>(
	createState: StateCreator<TState> | StoreApi<TState>
) {
	console.log(createState)
	const storeApi: StoreApi<TState> =
		typeof createState === 'function' ? createImpl(createState) : createState
	console.log(storeApi)

	const useStore: any = <StateSlice>(
		selector: StateSelector<TState, StateSlice> = api.getState as any
	) => {}
}
