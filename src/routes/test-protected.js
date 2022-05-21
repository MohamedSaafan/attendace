const handleAuthentication = require("../middlewares/handleAuthentication");

const router = new require("express").Router();
router.get("/test-protected", handleAuthentication, (req, res, next) => {
  return res.status(200).send("Hello from authenticated route");
});
module.exports = router;
