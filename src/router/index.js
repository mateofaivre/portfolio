import Vue from 'vue'
import VueRouter from 'vue-router'
import VueMeta from 'vue-meta'
import Home from '../views/Home.vue'
import Projects from "../views/Projects.vue";
import Timeline from "../views/Timeline.vue";
import Words from "../views/Words";


Vue.use( VueRouter )
Vue.use( VueMeta )

const routes = [
	{
		path:      '/',
		alias:     [ "/accueil", "/home" ],
		name:      'Home',
		component: Home,
		meta:      { transitionName: 'slide' }
	},
	{
		path:      '/projects',
		name:      'Projects',
		component: Projects,
		meta:      { transitionName: 'slide' }
	},
	{
		path: '/about',
		name: 'About',
		meta: { transitionName: 'slide' },
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
	},
	{
		path:      '/timeline',
		name:      'Timeline',
		component: Timeline
	},
	{
		path:      '/words',
		name:      'Words',
		component: Words
	},
	{
		path:      '/404',
		redirect: '/'
	},
	{
		path:     '*',
		redirect: '/404'
	}
]

const router = new VueRouter( {
	mode: 'history',
	base: process.env.BASE_URL,
	routes
} )

export default router
