const express = require("express");

const resturantController = require("../controllers/resturantController");

const router = express.Router();

router
  .route("/")
  .get(resturantController.getAllRestro)
  .post(resturantController.createRestro);

router.route("/restaurantId/:restroId").get(resturantController.getRestro);

router.route("/cuisine").get(resturantController.getRestroCuisines);

router
  .route("/:id")
  .delete(resturantController.deleteRestro)
  .put(resturantController.updateRestro)
  .get(resturantController.getRestroGrades);

module.exports = router;
