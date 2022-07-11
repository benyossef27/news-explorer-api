const router = require("express").Router();
const auth = require("../middleware/auth");

const { getUser } = require("../controllers/users");

const { createUser, login } = require("../controllers/auth");

const {
  validateCreateUser,
  validateLogin,
} = require("../middleware/validator");

router.get("/users/me", auth, getUser);

router.post("/signup", validateCreateUser, createUser);
router.post("/signin", validateLogin, login);

module.exports = router;
