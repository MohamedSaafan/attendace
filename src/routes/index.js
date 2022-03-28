const Router = require("express").Router;
const signUpRoute = require("./signup");
const router = new Router();
router.use(signUpRoute);
router.use("/", (req, res, next) => {
  res.send("hello from router");
});

module.exports = router;
