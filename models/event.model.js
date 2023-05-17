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
            type: {
                type: String
            },
            city: {
                type: String
            },
            coordinates: [Number]
        },
        eventImg: {
            type: String
        },
        assistants: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }]
    }
)

const Event = model("Event", eventSchema);

module.exports = Event;