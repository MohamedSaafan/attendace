const handleAuthentication = require("../middlewares/handleAuthentication");

const router = new require("express").Router();

router.post(
  "/students/courses/:id/upload-image",
  handleAuthentication,
  (req, res, next) => {
    const studentID = req.user.id;
    const { imageURL } = req.body;
    if (!imageURL)
      return res.status(400).send({ message: "Invalid Parameters" });
  }
);
