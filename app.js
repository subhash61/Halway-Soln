const express = require("express");
const path = require("path");
const compression = require("compression");
const cors = require("cors");

const resturantRouter = require("./routes/resturantRoutes");
const globalErrorHandler = require("./controllers/errorController");

const app = express();

//Serving static files
app.use(express.static(path.join(__dirname, `public`)));

//Implementing CORS
app.use(cors());

//every non simple request
app.options("*", cors());

//Body Parser
app.use(express.json());

app.use(compression());

//Routes
app.use("/api/v1/resturants/", resturantRouter);

app.use(globalErrorHandler);

module.exports = app;
