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
                'Authorization': process.env.API_KEY
            }
        })
    }
    getOneEvent(_id) {
        return this.axiosApp.get(`/events?id=${_id}`, {
            headers: {
                'Authorization': process.env.API_KEY
            }
        })
    }
    getEventAndUpdate(_id, changes) {
        return this.axiosApp.get(`/events?id=${_id}`, changes, {
            headers: {
                'Authorization': process.env.API_KEY
            }
        })
    }
}

const eventApiHandler = new EventApiHandler()

module.exports = eventApiHandler