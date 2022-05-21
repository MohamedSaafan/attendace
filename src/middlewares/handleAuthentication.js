const pool = require("../config/db");

const jwt = require("jsonwebtoken");

const handleAuthentication = async (req, res, next) => {
  // get your token
  const authorizeHeader = req.headers["authorization"];

  // we will assume that authorize header is in that shape "authorization:Bearer AToken"
  const token = authorizeHeader && authorizeHeader.split(" ")[1];
  // now check if there is a token or not
  if (!token) return res.sendStatus(401);

  // verfiy it and get your payload
  const payload = jwt.verify(token, "our secret");
  // this verify function verify that the hashed header and the hashed body matches their hashed signature
  console.log(payload.sub, "from payload sub");
  let user = null;
  // authenticate the user
  const getUserQuery = await pool.query(
    `SELECT * FROM students where id = $1`,
    [payload.sub]
  );
  user = getUserQuery.rows[0];

  if (getUserQuery.rowCount === 0) {
    // try to get the user pretending it is an instructor
    const getInstructorQuery = await pool.query(
      `
        SELECT * FROM instructors where id = $1
      `,
      [payload.sub]
    );
    if (getInstructorQuery.rowCount === 0)
      return res.status(404).send({ message: "User Not Authorized" });
    user = getInstructorQuery.rows[0];
    req.user = user;
    req.user.isInstructor = true;
    return next();
  }
  req.user = getUserQuery.rows[0];

  next();
};

module.exports = handleAuthentication;
