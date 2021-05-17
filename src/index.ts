import { Ref } from '@vue/reactivity'
import createImpl, {
	GetState,
	SetState,
	State,
	StoreApi,
	StateSelector
} from './create'

export type StateCreator<T extends State, CustomSetState = SetState<T>> = (
	set: CustomSetState,
	get: GetState<T>
) => T

export type WrapedWithRef<T extends State> = {
	[P in keyof T]: T[P] extends Function ? T[P] : Ref<T[P]>
}

export interface UseStore<T extends State> {
	(): WrapedWithRef<T>
	<U>(selector: StateSelector<WrapedWithRef<T>, U>): U
}

export function create<TState extends State>(
	createState: StateCreator<TState> | StoreApi<TState>
): UseStore<TState> {
	const storeApi: StoreApi<TState> =
		typeof createState === 'function' ? createImpl(createState) : createState

	const useStore: any = <StateSlice>(
		selector: StateSelector<TState, StateSlice> = storeApi.getState as any
	) => {
		const state = storeApi.getState()
		return selector(state)
	}
	return useStore
}
