const handleAuthentication = require("../middlewares/handleAuthentication");

const router = new require("express").Router();
router.get("/test-protected", handleAuthentication, (req, res, next) => {
  res.send("Hello from authenticated route");
});
module.exports = router;
