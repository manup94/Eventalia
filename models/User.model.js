const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true
    },
    email: {
      type: String,
      unique: true,
      required: true
    },
    avatar: {
      type: String,
      default: 'https://img.uxwing.com/wp-content/themes/uxwing/download/checkmark-cross/cross-icon.png'
    },
    interests: [
      {
        type: String,
        enum: ['Music', 'Gastronomy', 'Sports', 'Social']
      }
    ],
    address: {
      city: {
        type: String,
      },
      zipcode: {
        type: String,
      }
    },
    role: {
      type: String,
      enum: ['USER', 'ADMIN'],
      default: 'USER'
    },
    password: {
      type: String,
      required: true
    },
    events: [{
      type: Schema.Types.ObjectId,
      ref: 'Event'
    }],
    externalEvents: [{
      type: String
    }]
  },
  {
    timestamps: true
  }
);

const User = model("User", userSchema);

module.exports = User;
