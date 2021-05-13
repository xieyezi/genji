import create, { State } from 'genji'

interface userState extends State {
	info: {
		name: string
		age: number
		sex: string
	}
	getUserInfo: () => Promise<void>
	setUserAge: (age: number) => void
	setUserName: (name: number) => void
	subMitUserInfo: () => Promise<void>
}

export const useUserInfo = create<userState>((set, get) => ({
	info: {},
	getUserInfo: async () => {
		let res = await fetch('xxxxxx')
		set({
			info: res
		})
	},
	setUserAge: (age) => {
		let info = get().info
		info = { ...info, age }
		set({ info: info })
	},
	setUserName: (name) => {
		let info = get().info
		info = { ...info, name }
		set({ info: info })
	},
	subMitUserInfo: async () => {
		await fetch('xxxxxx', {
			method: 'POST',
			credentials: 'include',
			body: JSON.stringify({
				name: 'string',
				age: 'number',
				sex: 'string'
			})
		})
		get().getUserInfo()
	}
}))
