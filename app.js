const express = require("express");
const path = require("path");

const resturantRouter = require("./routes/resturantRoutes");
const globalErrorHandler = require("./controllers/errorController");

const app = express();

app.use(express.static(path.join(__dirname, `public`)));

//Body Parser
app.use(express.json());

app.use("/api/v1/resturants/", resturantRouter);

app.use(globalErrorHandler);

module.exports = app;
