<template>
	<!-- <img alt="Vue logo" src="./assets/logo.png" />
	<HelloWorld msg="Hello Vue 3 + TypeScript + Vite" /> -->
	<img alt="Vue logo" src="./assets/logo.png" />
	<p>count is: {{ count }}</p>
	<p>name is: {{ userInfo.name }}</p>
	<div>
		<button @click="increase">++</button>
	</div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import HelloWorld from './components/HelloWorld.vue'
import useStore from './store/userinfo'

export default defineComponent({
	name: 'App',
	components: {
		HelloWorld
	},
	setup() {
		const [
			count,
			userInfo,
			increase,
			getUserInfo,
			setUserInfo,
			submit
		] = useStore(state => [
			state.count,
			state.userInfo,
			state.increase,
			state.getUserInfo,
			state.setUserInfo,
			state.submit
		])

		onMounted(() => {
			getUserInfo()
		})

		const changeName = e => {
			// toggleName(e.target.value)
		}

		return {
			count,
			increase,
			userInfo
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
