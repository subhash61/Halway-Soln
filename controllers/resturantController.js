const Restaurant = require("../models/resturantModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

//Route Handlers

exports.getAllRestro = catchAsync(async (req, res, next) => {
  const limit = req.query.limit * 1 || 0;
  const restaurants = await Restaurant.find().limit(limit);
  res.status(200).json({
    status: "success",
    results: restaurants.length,
    data: {
      restaurants,
    },
  });
});

exports.getRestro = catchAsync(async (req, res, next) => {
  const restaurant = await Restaurant.findOne({
    restaurant_id: req.params.restroId,
  });
  res.status(200).json({
    status: "success",
    data: {
      restaurant,
    },
  });
});

exports.createRestro = catchAsync(async (req, res, next) => {
  const restaurant = await Restaurant.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      restaurant,
    },
  });
});

exports.deleteRestro = catchAsync(async (req, res, next) => {
  const restaurant = await Restaurant.findByIdAndDelete(req.params.id);

  if (!restaurant) {
    return next(new AppError("No restaurant found with that ID", 404));
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
});

exports.updateRestro = catchAsync(async (req, res, next) => {
  const restaurant = await Restaurant.findByIdAndUpdate(
    req.params.id,
    {
      address: req.body.address,
    },
    {
      new: true,
      runValidators: true,
    }
  );
  if (!restaurant) {
    return next(new AppError("No restaurant found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: restaurant,
  });
});

exports.getRestroGrades = catchAsync(async (req, res, next) => {
  const grades = await Restaurant.findById(req.params.id).select("grades");
  if (!grades) {
    return next(new AppError("No restaurant found with that ID", 404));
  }
  res.status(200).json({
    data: grades,
  });
});

exports.getRestroCuisines = catchAsync(async (req, res, next) => {
  let restaurants;
  restaurants = await Restaurant.aggregate([
    {
      $group: {
        _id: "$cuisine",
        TotalRestaurants: { $sum: 1 },
      },
    },
  ]);

  if (req.query.cuisine) {
    restaurants = await Restaurant.find(req.query);
  }

  res.status(200).json({
    status: "success",
    results: restaurants.length,
    data: {
      restaurants,
    },
  });
});
