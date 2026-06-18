import {
  sqliteDb
}
from "../platform/sqlite/sqliteDb.js";

sqliteDb.all(

  `
  SELECT *
  FROM logs
  ORDER BY id DESC
  LIMIT 10
  `,

  [],

  (error, rows) => {

    console.log(rows);

  }

);