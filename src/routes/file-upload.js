// you should set the content to multi-part form data
const multer = require("multer");
const pool = require("../config/db");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // do your logic here
    //after you do your logic you have to call the cb
    cb(null, "uploads/");
  },
  filename: async (req, file, cb) => {
    await pool.query("insert into  images (id,image_url) values (  $2 ,$1)", [
      file.originalname,
      req.params.student_code,
    ]);

    cb(null, file.originalname);
  },
});
const upload = multer({ storage });
const Router = require("express");
const router = new Router();

router.post(
  "/:student_code",
  upload.single("productImage"),
  (req, res, next) => {
    console.log(req.file);

    res.send("succeeded");
  }
);

module.exports = router;
