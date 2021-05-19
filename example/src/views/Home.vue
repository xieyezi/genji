<template>
	<h1>{{ msg }}</h1>
	<p>count is: {{ count }}</p>
	<p>count is: {{ countDouble }}</p>
	<p>name is: {{ userInfo.name }}</p>
	<div>
		<button @click="increase">count++</button>
	</div>
</template>

<script lang="ts">
import { computed, unref } from '@vue/reactivity'
import { defineComponent, onMounted } from 'vue'
import useStore from '../store/userinfo'

export default defineComponent({
	name: 'HelloWorld',
	props: {
		msg: {
			type: String,
			required: true
		}
	},
	setup() {
		/**
		 * pick without args
		 */
		// const { count, increase } = useStore()

		/**
		 * pick without Array
		 */
		const [userInfo, getUserInfo] = useStore(state => [
			state.userInfo,
			state.getUserInfo
		])

		/**
		 * pick without Object
		 */
		const { count, increase } = useStore(state => ({
			count: state.count,
			increase: state.increase
		}))

		const countDouble = useStore(state =>
			computed(() => unref(state.count) * 2)
		)

		onMounted(() => {
			getUserInfo()
		})

		return {
			count,
			increase,
			userInfo,
			countDouble
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
