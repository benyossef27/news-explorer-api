require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const mongoose = require("mongoose");
const { errors } = require("celebrate");
const { requestLogger, errorLogger } = require("./middleware/logger");
const NotFoundError = require("./errors/not-found-err");
const { errorsHandling } = require("./middleware/errors");
const { limiter } = require("./utils/constants");
const routes = require("./routes/index");
const { DB_ADDRESS } = require("./utils/constants");

const { PORT = 3001 } = process.env;

const app = express();

mongoose.connect(DB_ADDRESS);

app.use(limiter);
app.use(cors());
app.options("*", cors());
app.use(express.json());
app.use(helmet());
app.use(requestLogger);

app.use("/", routes);

app.use("/", (req, res, next) => {
  next(new NotFoundError("Requested resource not found."));
});

app.use(errorLogger);
app.use(errors());

app.use(errorsHandling);

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
