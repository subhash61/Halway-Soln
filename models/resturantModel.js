const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
  address: {
    type: {
      type: String,
      default: "Point",
      enum: ["Point"],
    },
    coord: [Number],
    building: String,
    street: String,
    zipcode: String,
  },
  borough: {
    type: String,
  },
  cuisine: {
    type: String,
  },
  grades: [
    {
      date: {
        type: Date,
        default: Date.now(),
      },
      grade: String,
      score: Number,
    },
  ],
  name: {
    type: String,
  },
  restaurant_id: String,
});

restaurantSchema.index({ cuisine: 1 });
restaurantSchema.index({ restaurant_id: 1 });

const Restaurant = mongoose.model("Restaurant", restaurantSchema);

module.exports = Restaurant;
