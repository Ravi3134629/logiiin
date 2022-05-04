const { model, Schema } = require("mongoose");

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  active_plan: {
    type: Number,
    default: 1,
  },
});

const User = model("user", userSchema);

module.exports = User;
