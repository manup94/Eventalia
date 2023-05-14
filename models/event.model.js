const { Schema, model } = require("mongoose");


const eventSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        category: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: false
        },
        start: {
            type: Date,
            required: true
        },
        end: {
            type: Date,
            required: true
        },
        location: {
            city: {
                type: String
            },
            geometry: [{
                lat: {
                    type: String
                },
                lng: {
                    type: String
                }
            }]
        },
        eventImg: {
            type: String
        },
        favorites: [{
            type: Schema.Types.ObjectId,
            default: 'No favorites yet',
            ref: 'User'
        }]
    }
)

const Event = model("Event", eventSchema);

module.exports = Event;