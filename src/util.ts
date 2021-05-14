export function useCheckFn(value: any) {
	return Object.prototype.toString.call(value) === '[object Function]'
		? true
		: false
}
