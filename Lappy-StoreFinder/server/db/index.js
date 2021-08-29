require('dotenv').config();
// postgres basic + query config refer https://node-postgres.com/features/connecting
const { Pool }  = require('pg');

const pool = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.DATABASE_PASS,
  port: process.env.DATABASE_PORT,
});


module.exports = {
  query: (text,params) => pool.query(text,params),
}
