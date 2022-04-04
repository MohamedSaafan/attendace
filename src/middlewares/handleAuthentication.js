const pool = require("../config/db");

const jwt = reuqire('jsonwebtoken');

const handleAuthentication = (req, res, next) => {
  // get your token
  const authorizeHeader = req.headers["authorization"];

  // we will assume that authorize header is in that shape "authorization:Bearer AToken"
  const token = authorizeHeader && authorizeHeader.split(" ")[1];
  // now check if there is a token or not
  if (!token) return res.sendStatus(401);

  // verfiy it and get your payload
  const payload = jwt.verify(token, "our secret");
  // this verify function verify that the hashed header and the hashed body matches their hashed signature

  // authenticate the user
  const getUserQuery = await pool.query(`SELECT * FROM students where id = $1`,[payload.sub]);
  if(getUserQuery.rowCount === 0){
      res.status(400).send({"message":"User Not Found"})
    return console.log("no matched user");
  }
  req.user = getUserQuery.rows[0];
  next();
};

module.exports = handleAuthentication;
