import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "000",
  database: "Endpoint",
  port: 5432,
});

export default pool;
