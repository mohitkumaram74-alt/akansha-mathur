import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      default: "",
    },
    cuisines: {
      type: [String],
      default: [],
    },
    rating: {
      type: Number,
      default: 0,
    },
    deliveryTime: {
      type: String,
      default: "30-40 mins",
    },
    costForTwo: {
      type: String,
      default: "₹300 for two",
    },
    address: {
      type: String,
      default: "",
    },
  },
  { timestamps: true },
);

const Restaurant = mongoose.model("Restaurant", restaurantSchema);

export default Restaurant;
