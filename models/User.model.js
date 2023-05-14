const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
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
      default: 'https://i.stack.imgur.com/l60Hf.png'
    },
    interest: {
      type: [String],
      enum: ['Music', 'Gastronomy', 'Sports', 'Social'],
      required: false
    },
    favorites: [{
      type: Schema.Types.ObjectId,
      default: 'No interest yet',
      ref: 'Event'
    }]
    ,
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
    }

  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`    
    timestamps: true
  }
);

const User = model("User", userSchema);

module.exports = User;
