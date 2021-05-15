export function useCheckFn(value: any) {
	let isFn = false
	if (
		Object.prototype.toString.call(value) === '[object Function]' ||
		Object.prototype.toString.call(value) === '[object AsyncFunction]'
	) {
		isFn = true
	}

	return isFn
}
