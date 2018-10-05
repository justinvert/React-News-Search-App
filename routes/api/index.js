const router = require("express").Router();
const ArticleRoutes = require("./articles");

router.use("/articles", ArticleRoutes);

module.exports = router;
