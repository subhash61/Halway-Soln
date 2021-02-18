const express = require("express");
const path = require("path");

const resturantRouter = require("./routes/resturantRoutes");
const globalErrorHandler = require("./controllers/errorController");

const app = express();

//Serving static files
app.use(express.static(path.join(__dirname, `public`)));

//Body Parser
app.use(express.json());

//Routes
app.use("/api/v1/resturants/", resturantRouter);

app.use(globalErrorHandler);

module.exports = app;
