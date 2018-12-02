import Vue from 'vue'
import Router from 'vue-router'
import Game from '@/components/Game'
import DialogueGraphVisualizer from '@/components/DialogueGraphVisualizer'
import ASCIIMapConversion from '@/components/ASCIIMapConversion'
import VoronoiVisualizer from '@/components/VoronoiVisualizer'
import Playground from '@/components/Playground'
Vue.use(Router)

const router = new Router({
	routes: [
		{
			path: '/playground',
			name: 'Rotten Soup - Playground',
			component: Playground
		},
		{
			path: '/dungeonvis',
			name: 'Rotten Soup - ASCII Dungeon Viewer',
			component: ASCIIMapConversion

		},
		{
			path: '/graphvis',
			name: 'Rotten Soup - Dialogue Visualizer',
			component: DialogueGraphVisualizer
		},
		{
			path: '*',
			name: 'Rotten Soup',
			component: Game
		},
		{
			path: '/voronoi',
			component: VoronoiVisualizer
		}
	]
})

export default router
