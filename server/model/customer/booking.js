const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  rideCategory: { type: String },
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
  bookingDate: { type: String },
  bookingTime: { type: String },

  // bookingStatus
  bookingStatus: { type: String, default: "searching" },
  //searching->req sent from passenger and looking for cab rider
  //booked-> cab rider has accepted booking
  //cancelled-> passenger or cab rider cancelled the booking

  //passsenger and rider ids
  passengerId: { type: mongoose.Schema.Types.ObjectId, ref: "passenger" },
  riderId: { type: mongoose.Schema.Types.ObjectId, ref: "rider" },
});

const bookingModel = mongoose.model("booking", bookingSchema);
module.exports = bookingModel;
