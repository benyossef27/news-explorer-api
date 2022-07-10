const NotFoundError = require("../errors/not-found-err");
const User = require("../models/user");
const { STATUS_CODES } = require("../utils/constants");

module.exports.getAllUsers = (req, res, next) => {
  User.find({})
    .select("+password")

    .then((users) => res.status(STATUS_CODES.ok).send({ data: users }))
    .catch(next);
};

module.exports.getUser = (req, res, next) => {
  User.findById(req.user ? req.user._id : "")
    .orFail(new NotFoundError("User not Found"))
    .then(({ email, name }) =>
      res.status(STATUS_CODES.ok).send({ email, name })
    )
    .catch(next);
};
