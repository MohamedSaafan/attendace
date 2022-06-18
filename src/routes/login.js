const pool = require("../config/db");
const jwt = require("jsonwebtoken");
const Router = require("express").Router;
const router = new Router();
router.post("/instructors/login", async (req, res) => {
  console.log("entered the login post");
  let { name, password } = req.body;
  if (!name || !password) {
    return res.send("you must enter a complete data");
  }
  const getInstructorQuery = await pool.query(
    `SELECT * FROM instructors where name =$1 `,
    [name]
  );
  if (getInstructorQuery.rowCount === 0) {
    return res.status(403).send({ message: "User Doesn't exist" });
  }
  if (password === getInstructorQuery.rows[0].password) {
    const token = jwt.sign(
      { sub: getInstructorQuery.rows[0].id },
      "our secret"
    );
    res.send({ token, id: getInstructorQuery.rows[0].id });
  }
});
router.post("/students/login", async (req, res) => {
  console.log("entered the login post");
  let { code, password } = req.body;
  const id = code;
  if (!id || !password) {
    return res.send("you must enter a complete data");
  }
  const getUserQuery = await pool.query(
    `SELECT * FROM students where id =$1 `,
    [id]
  );
  if (getUserQuery.rowCount === 0) {
    return res.send("User Doesn't exist");
  }
  if (password === getUserQuery.rows[0].password) {
    const token = jwt.sign({ sub: getUserQuery.rows[0].id }, "our secret");
    res.send({ token });
  }
});

module.exports = router;

// and now we are done,  but there exist one thing,  how will we use this approach and integrate with our client side
// i will tell you how this integration would work ,
// send this token after the user is authenticated to the client and the client will send this token every time the user needs some thing from the server
//you must send it  in the header of that request
// and the header of the authenticated request must contain the following
// {authorization:Berear ATokenToBeAuthenticaed}
// and now we are done
