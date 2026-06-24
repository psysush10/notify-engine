import sqlite3 from "sqlite3";


sqlite3.verbose();

export const sqliteDb =
  new sqlite3.Database(

    "./notify-engine-logs.db",

    (error) => {

      if (error) {

        console.error(
          error.message
        );

      } else {

        console.log(
          "SQLite Connected"
        );

      }

    }

  );

  