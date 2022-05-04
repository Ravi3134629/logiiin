const { model, Schema } = require("mongoose");

const planSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
  },
  priority: {
    type: Number,
    required: true,
  },
});

const Plan = model("Plan", planSchema);

module.exports = Plan;
