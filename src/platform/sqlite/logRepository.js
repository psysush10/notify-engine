import {
  sqliteDb
}
from "./sqliteDb.js";

export const saveLog =
(
  level,
  message,
  metadata
) => {

  sqliteDb.run(

    `

    INSERT INTO logs (

      timestamp,
      level,
      message,
      metadata

    )

    VALUES (

      ?,
      ?,
      ?,
      ?

    )

    `,

    [

      new Date()
        .toISOString(),

      level,

      message,

      JSON.stringify(
        metadata
      )

    ]

  );

};

export const getRecentLogs = () => {

  return new Promise(

    (
      resolve,
      reject
    ) => {

      sqliteDb.all(

        `
        SELECT *
        FROM logs
        ORDER BY id DESC
        LIMIT 20
        `,

        [],

        (
          error,
          rows
        ) => {

          if (error) {

            reject(
              error
            );

          } else {

            resolve(
              rows
            );

          }

        }

      );

    }

  );

};