import create from '@App/index'
import axios from 'axios'
import { computed, unref } from '@vue/reactivity'

type CounterState = {
	count: number
	increase: () => void
}

type UserState = {
	name: string
	changeName: () => Promise<void>
}

it('use the store with no args', () => {
	const useStore = create<CounterState>(set => ({
		count: 0,
		increase: () => set(state => ({ count: state.count + 1 }))
	}))

	const { count, increase } = useStore()

	expect(count.value).toBe(0)
	expect(increase).toBeInstanceOf(Function)
	increase()
	expect(count.value).toBe(1)
})

it('use the store with object selector', () => {
	const useStore = create<CounterState>(set => ({
		count: 0,
		increase: () => set(state => ({ count: state.count + 1 }))
	}))

	const { count, increase } = useStore(state => ({
		count: state.count,
		increase: state.increase
	}))

	expect(count.value).toBe(0)
	expect(increase).toBeInstanceOf(Function)
	increase()
	expect(count.value).toBe(1)
})

it('use the store with Array selector', () => {
	const useStore = create<CounterState>(set => ({
		count: 0,
		increase: () => set(state => ({ count: state.count + 1 }))
	}))

	const [count, increase] = useStore(state => [state.count, state.increase])

	expect(count.value).toBe(0)
	expect(increase).toBeInstanceOf(Function)
	increase()
	expect(count.value).toBe(1)
})

it('use the store with one by one selector', () => {
	const useStore = create<CounterState>(set => ({
		count: 0,
		increase: () => set(state => ({ count: state.count + 1 }))
	}))

	const count = useStore(state => state.count)
	const increase = useStore(state => state.increase)

	expect(count.value).toBe(0)
	expect(increase).toBeInstanceOf(Function)
	increase()
	expect(count.value).toBe(1)
})

it('use the store to memoizing selector', () => {
	const useStore = create<CounterState>(set => ({
		count: 0,
		increase: () => set(state => ({ count: state.count + 1 }))
	}))

	const count = useStore(state => state.count)
	const countDouble = useStore(state => computed(() => unref(state.count) * 2))
	const increase = useStore(state => state.increase)

	expect(count.value).toBe(0)
	expect(countDouble.value).toBe(0)
	expect(increase).toBeInstanceOf(Function)
	increase()
	increase()
	expect(count.value).toBe(2)
	expect(countDouble.value).toBe(4)
})

it('change the store by function', () => {
	const useStore = create<CounterState>(set => ({
		count: 0,
		increase: () => set(state => ({ count: state.count + 1 }))
	}))

	const count = useStore(state => state.count)
	const increase = useStore(state => state.increase)

	expect(count.value).toBe(0)
	expect(increase).toBeInstanceOf(Function)
	increase()
	expect(count.value).toBe(1)
})

it('change the store by object', () => {
	const useStore = create<CounterState>(set => ({
		count: 0,
		increase: () => set({ count: 1 })
	}))

	const count = useStore(state => state.count)
	const increase = useStore(state => state.increase)

	expect(count.value).toBe(0)
	expect(increase).toBeInstanceOf(Function)
	increase()
	expect(count.value).toBe(1)
})

it('change the store by async function', async () => {
	const useStore = create<UserState>(set => ({
		name: 'genji',
		changeName: async () => {
			const res: any = await axios.get(
				'http://xieyezi.com:9003/mock/19/daily/genji'
			)
			const { name } = res.data
			expect(name).toBe('juefei')
			if (name) set({ name: name })
		}
	}))

	const name = useStore(state => state.name)
	const changeName = useStore(state => state.changeName)

	expect(name.value).toBe('genji')
	expect(changeName).toBeInstanceOf(Function)
	await changeName()
	expect(name.value).toBe('juefei')
})

it('read from state in actions', () => {
	const useStore = create<CounterState>((set, get) => ({
		count: 0,
		increase: () => {
			const { count } = get()
			expect(count).toBe(0)
			if (count == 0) set({ count: 1 })
		}
	}))

	const count = useStore(state => state.count)
	const increase = useStore(state => state.increase)

	expect(count.value).toBe(0)
	expect(increase).toBeInstanceOf(Function)
	increase()
	expect(count.value).toBe(1)
})
