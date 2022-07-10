const router = require("express").Router();

const users = require("./users");
const auth = require("./auth");
const articles = require("./articles");

router.use("/users", auth, users);
router.use("/articles", auth, articles);

module.exports = router;
