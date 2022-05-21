const Pool = require("pg").Pool;
const DATABASE_URI =
  "postgres://jqoabsxnklrrpf:4f3af4e767ff63576203008a146d0f733afdf33eec2f7db96f9cc770727c7a7a@ec2-34-231-177-125.compute-1.amazonaws.com:5432/d1jegs2f6au5to";

const pool = new Pool({
  connectionString: DATABASE_URI,
  ssl: {
    rejectUnauthorized: false,
  },
});

module.exports = pool;
