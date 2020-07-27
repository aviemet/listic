import { observable } from 'mobx'
import Store from 'lib/Store'
import { IStore } from 'lib/Store'
import { EventModel } from 'data/Events'

export default class EventsStore extends Store {
	_model = EventModel
	_base_ref = 'events'
}

export interface IEventsStore extends IStore {
}