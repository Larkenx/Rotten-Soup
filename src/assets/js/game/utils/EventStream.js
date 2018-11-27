export default class EventStream {
	constructor() {
		this.events = []
		this.topics = {} // map of topic string to array of cb functions
	}

	addEventListener(topic, fn) {
		if (topic in this.topics) this.topics[topic].push(fn)
		else this.topics[topic] = [fn]
	}

	emit(topic, params) {
		this.events.unshift({ topic, params })
		if (topic in this.topics) this.topics[topic].forEach(cb => cb(params))
	}
}
