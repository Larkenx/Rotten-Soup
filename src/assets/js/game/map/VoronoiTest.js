import { Delaunay } from 'd3-delaunay'

const points = [[0, 0], [0, 1], [1, 0], [1, 1]]
const delaunay = Delaunay.from(points)
const voronoi = delaunay.voronoi([0, 0, 960, 500])

export default voronoi
