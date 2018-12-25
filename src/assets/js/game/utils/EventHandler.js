export default class EventHandler {
	constructor(eventStream) {
		this.eventStream = eventStream
	}

	on(topic, fn) {
		this.eventStream.addEventListener(topic, fn)
		return this
	}
}
