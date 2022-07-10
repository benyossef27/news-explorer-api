const router = require("express").Router();
const auth = require("../middleware/auth");

const {
  getArticles,
  addArticle,
  deleteArticle,
} = require("../controllers/articles");

router.get("/", auth, getArticles);
router.post("/", auth, addArticle);
router.delete("/:articleId", auth, deleteArticle);

module.exports = router;
