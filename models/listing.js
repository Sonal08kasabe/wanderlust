const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
   url:String,
   filename:String,
  },
  price: Number,
  location: String,
  country: String,
  owner:{
    type:Schema.Types.ObjectId,
    ref:"user"
  }
});

const listing = mongoose.model("listing", listingSchema);
module.exports = listing;
