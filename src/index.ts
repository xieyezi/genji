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
	const storeApi: StoreApi<TState> =
		typeof createState === 'function' ? createImpl(createState) : createState
	console.log('storeApi', storeApi)
	const useStore: any = <StateSlice>(
		selector: StateSelector<TState, StateSlice> = storeApi.getState as any
	) => {
		const state = storeApi.getState()
		Object.assign(useStore, storeApi)
		return selector(state)
	}
	return useStore
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

const { count, increase, removeAll } = useStore()
console.log('useStore', useStore)

console.log('count', count)
console.log('increase', increase)
console.log('removeAll', removeAll)
increase()
console.log('count', count)
