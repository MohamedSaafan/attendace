const Router = require("express").Router;
const signUpRoute = require("./signup");
const loginRoute = require("./login");
const router = new Router();
const fileUploadRouter = require("./file-upload");
const protectedRoute = require("./test-protected");
const coursesRoute = require("./courses");
router.use(coursesRoute);
router.use(protectedRoute);
router.use(signUpRoute);
router.use(loginRoute);
router.use("/image", fileUploadRouter);
router.use("/", (req, res, next) => {
  res.send("this route isn't handled yet");
});

module.exports = router;
