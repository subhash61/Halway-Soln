// Create a free account in MongoDB atlas with your own personal account.
// It's free of cost and you can create one very easily with any of ur Gmail account, if you don't have a Gmail account, please create one and create a MongoDB atlas account
// After creating a MongoDB atlas account, create a cluster and you can click on a load sample dataset, It's very easy and you can clearly find the instructions.
// I have attached some screenshots below for your reference
// Now Please create a node express mongoose (Mongo) project
// Connect to MongoDB atlas restaurants dataset
// https://docs.atlas.mongodb.com/sample-data/sample-restaurants#std-label-sample-restaurants
// Create the following API's
// GET API with GET /restaurants?limit=20 (Should be able to pass limit dynamically)
// GET API /restaurant/1233, example 1233 - assume as a restaurant ID should get the details of the restaurant.
// POST API to create a new restaurant with sample address, cuisine & grades, You can check the collection format and column names.
// PUT API to update the restaurant address
// DELETE API pass an ID, and delete the restaurant
// GET API to GET the grades of the restaurant when you pass restaurant object ID
// GET API with GET /cuisines should return only the unique cuisines array from the whole database collection
// GET API /restaurants/cuisine/?cuisine=American should get all the restaurant names which the cuisine name passed.
// Outcome expected
// Please deploy the project on to Heroku, its very easy to deploy a project on Heroku
// Please push the code to Github and submit us the code repository. (You can comment out the mongo username, password when pushing to Github) / you can keep the credentials in a [.env file ] and you could pass the .env file to us through an email
// Unit test cases gain bonus points.
// Coding standards, comments, API's, good methods naming conventions will be noticed.
// Error handling of API's
// Please export the postman (HEROKU DEPLOYED API"s) collection and mail us. (We could import them and fire them), They should be working
const Restaurant = require("../models/resturantModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

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
  console.log(req.query.cuisine);
  const restaurants = await Restaurant.find(req.query.cuisine);
  res.status(200).json({
    status: "success",
    results: restaurants.length,
    data: {
      restaurants,
    },
  });
});
