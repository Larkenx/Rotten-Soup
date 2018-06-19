import Vue from 'vue'
import Router from 'vue-router'
import Game from '@/components/Game'
import DialogueGraphVisualizer from '@/components/DialogueGraphVisualizer'
Vue.use(Router)

const router = new Router({
	routes: [
		{
			path: '/graphvis',
			name: 'Rotten Soup - Dialogue Visualizer',
			component: DialogueGraphVisualizer
		},
		{
			path: '*',
			name: 'Rotten Soup',
			component: Game
		}
	]
})

export default router
