import create from '@App/create'

type CounterState = {
	count: number
	increase: () => void
}

it('creates a store hook and api object', () => {
	let params
	const result = create((...args) => {
		params = args
		return { value: null }
	})
	expect({ params, result }).toMatchInlineSnapshot(`
		Object {
		  "params": Array [
		    [Function],
		    [Function],
		    Object {
		      "getState": [Function],
		      "setState": [Function],
		    },
		  ],
		  "result": Object {
		    "getState": [Function],
		    "setState": [Function],
		  },
		}
	`)
})

it('finish create state and return getstate and setstate', () => {
	const storeApi = create<CounterState>(set => ({
		count: 0,
		increase: () => set(state => ({ count: state.count + 1 }))
	}))
	expect(storeApi).toMatchInlineSnapshot(`
		Object {
		  "getState": [Function],
		  "setState": [Function],
		}
	`)
})
