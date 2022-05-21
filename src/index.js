const express = require("express");
const pool = require("./config/db");
const router = require("./routes");
const app = express();
app.use(express.json());

app.post("/test", async (req, res, next) => {
  const query = await pool.query("select * from test");
  console.log(new Date(query.rows[0].date).toString(), "from date");

  res.status(200).send("succeeded");
});

app.use(router);

app.listen(process.env.PORT || 8080);
