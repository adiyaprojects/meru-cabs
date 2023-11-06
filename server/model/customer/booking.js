const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  // user details
  name: { type: String },
  email: { type: String },
  address: { type: String },
  //   booking details
  pickupLocation: {
    city: { type: String },
    area: { type: String },
    latitude: { type: String },
    longitude: { type: String },
  },
  destinationLocation: {
    city: { type: String },
    area: { type: String },
    latitude: { type: String },
    longitude: { type: String },
  },
  rideCategory: { type: String },
  bookingDate: { type: String },
  bookingTime: { type: String },

  accountId: { type: mongoose.Schema.Types.ObjectId, ref: "passengers" },
  riderId: { type: mongoose.Schema.Types.ObjectId, ref: "riders" },
});

const bookingModel = mongoose.model("booking", bookingSchema);
module.exports = bookingModel;
