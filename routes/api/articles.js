const router = require("express").Router();
const ArticleController = require("../../controllers/ArticleController");

router.route("/")
  .get(ArticleController.findAll)
  .post(ArticleController.create);

router
  .route("/:id")
  .get(ArticleController.findById)
  // .put(ArticleController.update)
  .delete(ArticleController.remove);

module.exports = router;
