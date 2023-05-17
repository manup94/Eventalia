const axios = require("axios");

class EventApiHandler {

    constructor() {
        this.axiosApp = axios.create({
            baseURL: 'https://api.predicthq.com/v1'
        })
    }

    getEvents() {
        return this.axiosApp.get('/events', {
            headers: {
                'Authorization': 'Bearer 56B_yqklDeuazp4Rw3C9xGJlRhFvemFHMgv7kNdK'
            }
        })
    }
    getOneEvent(_id) {
        return this.axiosApp.get(`/events?id=${_id}`, {
            headers: {
                'Authorization': 'Bearer 56B_yqklDeuazp4Rw3C9xGJlRhFvemFHMgv7kNdK'
            }
        })
    }
    getEventAndUpdate(_id, changes) {
        return this.axiosApp.get(`/events?id=${_id}`, changes, {
            headers: {
                'Authorization': 'Bearer 56B_yqklDeuazp4Rw3C9xGJlRhFvemFHMgv7kNdK'
            }
        })
    }
}

const eventApiHandler = new EventApiHandler()

module.exports = eventApiHandler