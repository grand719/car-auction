const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  telephoneNumber: { type: String, required: true },
  price: { type: Number, required: true },
  date: { type: Date, required: true },
  vin: { type: String, required: true },
  pesel: { type: String, required: true },
  image: { type: String, required: true },
  bids: [
    {
      name: { type: String, required: true },
      peselBid: { type: String, required: true },
      bidValue: { type: Number, required: true },
    },
  ],
});

module.exports = mongoose.model("Post", postSchema);
