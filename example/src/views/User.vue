<template>
	<h1>{{ msg }}</h1>
	<p>count is: {{ count }}</p>
	<p>name is: {{ userInfo.name }}</p>
	<p>age is: {{ userInfo.age }}</p>
	<p>hero is: {{hero}}}</p>
	<div>
		<button @click="increase">++</button>
	</div>
	<div style="padding-top: 10px;">
		<button @click="changeCountAndHero">changeCountAndHero</button>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import useStore from '../store/userinfo'

export default defineComponent({
	name: 'User',
	props: {
		msg: {
			type: String,
			required: true
		}
	},
	setup() {
		const [count, userInfo,hero, increase,changeCountAndHero ] = useStore(state => [
			state.count,
			state.userInfo,
			state.hero,
			state.increase,
			state.changeCountAndHero
		])

		return {
			count,
			hero,
			userInfo,
			increase,
			changeCountAndHero
		}
	}
})
</script>

<style scoped>
a {
	color: #42b983;
}

label {
	margin: 0 0.5em;
	font-weight: bold;
}

code {
	background-color: #eee;
	padding: 2px 4px;
	border-radius: 4px;
	color: #304455;
}
</style>
