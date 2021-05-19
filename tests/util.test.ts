import { useCheckFn } from '@App/util'

describe('useCheckFn', () => {
	it('should return false', () => {
		expect(useCheckFn('genji')).toBe(false)
		expect(useCheckFn(true)).toBe(false)
		expect(useCheckFn({ name: 'genji' })).toBe(false)
		expect(useCheckFn(['genji'])).toBe(false)
	})

	it('should return true', () => {
		const testFn = () => {}
		const asyncTestFn = async () => {}

		expect(useCheckFn(testFn)).toBe(true)
		expect(useCheckFn(asyncTestFn)).toBe(true)
	})
})
