const Router = require("express").Router;
const router = new Router();
const pool = require("../config/db");

router.post("/signup", async (req, res, next) => {
  let { password } = req.body;
  let { name } = req.body;
  let { code } = req.body;
  let { imageURL } = req.body;
  if (!name && !code && !password) {
    console.log(name, code, password);
    return res.send("you must provide a complete data");
  }

  // check if there exist a user with these credential
  const findStudentQuery = await pool.query(
    "select * from students where id = $1",
    [code]
  );
  if (findStudentQuery.rowCount !== 0)
    res.status(501).send({ message: "The Student is Registered" });

  //  the student doesn't exist, we should register him
  const insertQuery = await pool.query(
    `insert into students(
        id,
        name,
        image_url,
        password

    ) VALUES (
        $1,
        $2,
        $3,
        $4
    )`,
    [code, name, imageURL, password]
  );
  // we can decrypt the password
  //using one of the encryption methods we are learning in the crypto course
  res.status(201).send({ message: "Student Registered Successfully" });
});

module.exports = router;
