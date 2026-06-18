import {
  sqliteDb
}
from "./sqliteDb.js";

sqliteDb.serialize(() => {

  sqliteDb.run(`

    CREATE TABLE IF NOT EXISTS logs (

      id INTEGER
      PRIMARY KEY AUTOINCREMENT,

      timestamp TEXT,

      level TEXT,

      message TEXT,

      metadata TEXT

    )

  `);

});