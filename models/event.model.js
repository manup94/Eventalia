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
            type: String,
            default: 'https://dancingastronaut.com/wp-content/uploads/2021/07/Ivan-Meneses-for-Insomniac-Events-11.jpg'
        },
        assistants: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }]
    }
)

const Event = model("Event", eventSchema);

module.exports = Event;