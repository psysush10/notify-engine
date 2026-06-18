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