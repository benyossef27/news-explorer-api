const Article = require("../models/article");
const { ERROR_MESSAGES, STATUS_CODES } = require("../utils/constants");

const ServerError = require("../errors/server-err");
const NotFoundError = require("../errors/not-found-err");
const AuthError = require("../errors/auth-err");

module.exports.getArticles = (req, res, next) => {
  Article.find({})
    .select("+owner")
    .then((articles) => res.status(STATUS_CODES.ok).send(articles))
    .catch(() => {
      throw new ServerError(ERROR_MESSAGES.internalServer);
    })
    .catch(next);
};

module.exports.addArticle = (req, res, next) => {
  // const { keyword, title, text, date, source, link, image } = req.body;
  Article.create({
    ...req.body,
    owner: req.user._id,
  })
    .then((article) => res.status(STATUS_CODES.ok).send(article))
    .catch(next);
};

module.exports.deleteArticle = (req, res, next) => {
  Article.findById({ _id: req.params.articleId })
    .select("+owner")
    .then((article) => {
      if (article && req.user._id.toString() === article.owner.toString()) {
        Article.deleteOne(article).then((deletedArticle) => {
          res.status(STATUS_CODES.ok).send(deletedArticle);
        });
      } else if (!article) {
        next(new NotFoundError(ERROR_MESSAGES.articleNotFound));
      } else {
        next(new AuthError(ERROR_MESSAGES.deleteArticle));
      }
    })
    .catch((err) => {
      if (err.name === "CastError" || err.statusCode === 404) {
        next(new NotFoundError(ERROR_MESSAGES.articleNotFound));
      }
      next(err);
    })
    .catch(next);
};
