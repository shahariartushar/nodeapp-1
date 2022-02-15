const Joi = require("joi");
const logger = require("./middleware/logger");
const helmet = require("helmet");
const morgan = require("morgan");
const config = require("config");
const express = require("express");
const courses = require("./routes/courses");
const courses = require("./routes/home");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(helmet());
app.use(logger);
app.use("/api/courses", courses);

if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  console.log("Morgan Enabled...");
}

//port
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

//multiple params /api/year/month
app.get("/api/:year/:month", (req, res) => {
  res.send(req.params); //test message
});

// /api/year/month?sortBy=name
app.get("/api/:year/:month", (req, res) => {
  res.send(req.query);
});
