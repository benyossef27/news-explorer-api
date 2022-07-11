const router = require("express").Router();

const users = require("./users");
const auth = require("./auth");
const articles = require("./articles");

router.use(users, articles, auth);

module.exports = router;
