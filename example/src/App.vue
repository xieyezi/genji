<template>
	<img alt="Vue logo" src="./assets/logo.png" />
	<img alt="Genji logo" width="210" height="210" src="./assets/genji.png" />
	<div id="nav">
		<router-link to="/">Home Page</router-link>
		<span style="padding-left: 10px;padding-right: 10px;">|</span>
		<router-link to="/user">User Page</router-link>
	</div>
	<router-view />
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import HelloWorld from './components/HelloWorld.vue'

export default defineComponent({
	name: 'App',
	components: {
		HelloWorld
	},
	setup() {}
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
/* #nav {
	padding-top: 60px;
	padding-bottom: 20px;
	span {
		padding-left: 15px;
		padding-right: 15px;
	}
	a {
		font-size: 20px;
		font-weight: bold;
		color: #2c3e50;
		&.router-link-exact-active {
			color: white;
		}
	}
} */
</style>
