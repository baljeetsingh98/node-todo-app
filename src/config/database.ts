import { Pool } from "pg"

const pool = new Pool({
  host: "localhost",
  port: 5432,
  user: "postgres",
  password: "baljeet",
  database: "todoapi",
});

export default pool;
