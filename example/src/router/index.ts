import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		name: 'Home',
		component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue')
	},
	{
		path: '/user',
		name: 'User',
		component: () => import(/* webpackChunkName: "about" */ '../views/User.vue')
	}
]

const router = createRouter({
	history: createWebHashHistory(),
	routes
})

export default router
