const router = require("express").Router();

const users = require("./users");
const articles = require("./articles");

router.use(users, articles);

module.exports = router;
