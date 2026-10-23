import Restaurant from "../models/resturent.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

// Get all restaurants
export const getRestaurants = asyncHandler(async (req, res) => {
  const restaurants = await Restaurant.find().sort({
    createdAt: -1,
  });

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        count: restaurants.length,
        restaurants,
      },
      "Restaurants fetched successfully",
    ),
  );
});

// Add a new restaurant
export const addRestaurant = asyncHandler(async (req, res) => {
  const restaurant = await Restaurant.create(req.body);

  if (!restaurant) {
    throw new ApiError(500, "Restaurant could not be created");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, restaurant, "Restaurant added successfully"));
});
