<template>
	<img alt="Vue logo" src="./assets/logo.png" />
	<HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import HelloWorld from './components/HelloWorld.vue'
import { useUserInfo } from './store/userinfo'

export default defineComponent({
	name: 'App',
	components: {
		HelloWorld
	},
	setup() {
		const { info, getUserInfo } = useUserInfo((store) => ({
			info: store.info,
			getUserInfo: store.getUserInfo
		}))

		onMounted(() => {
			getUserInfo()
		})

		return {
			info
		}
	}
})
</script>

<style>
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin-top: 60px;
}
</style>
