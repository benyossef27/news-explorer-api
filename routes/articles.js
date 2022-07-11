const router = require("express").Router();
const auth = require("../middleware/auth");

const {
  getArticles,
  addArticle,
  deleteArticle,
} = require("../controllers/articles");
const {
  validateCreateArticle,
  validateDeleteArticle,
} = require("../middleware/validator");

router.get("/articles", auth, getArticles);
router.post("/articles", auth, validateCreateArticle, addArticle);
router.delete(
  "/articles/:articleId",
  auth,
  validateDeleteArticle,
  deleteArticle
);

module.exports = router;
