import create, { State } from '../../../src/index'

export interface UserInfo {
	name: string
	age: string
	company: {
		id: string
		name: string
		address: string
	}
}

export interface Hero {
	name: string
	skill: string
	type: string
}

interface userState extends State {
	count: number
	userInfo: UserInfo
	hero: Object
	increase: () => void
	changeCountAndHero: () => void
	getUserInfo: () => Promise<void>
}
const useStore = create<userState>((set, get) => ({
	count: 0,
	userInfo: {} as UserInfo,
	hero: {
		name: 'genji',
		type: 'attack,',
		skill: 'Shuriken'
	},
	increase: () => set(state => ({ count: state.count + 1 })),
	getUserInfo: async () => {
		const res = await fetch('http://xieyezi.com:9003/mock/19/daily/genji')
		const json = await res.json()
		set({ userInfo: json })
	},
	changeCountAndHero: () =>
		set({
			count: 20,
			hero: {
				name: 'tracer',
				type: 'attack',
				skill: 'gun'
			}
		})
}))

export default useStore
