import fs from "fs";
import path from "path";

import {pool} from "../config/db.js";

const run = async () => {

    try{

        const migrationDir =
            path.resolve(
                "src/migrations"
            );

        const files =
            fs.readdirSync(
                migrationDir
            ).sort();

        console.log(
            "Running migrations..."
        );

        await pool.query(`

    CREATE TABLE IF NOT EXISTS migrations (

        id SERIAL PRIMARY KEY,

        migration_name VARCHAR(255)
        UNIQUE,

        executed_at TIMESTAMP
        DEFAULT NOW()

    )

`);

        for (
            const file
            of files
        ) {

            console.log(
                `Found ${file}`
            );

            const existing =

                await pool.query(

                    `
                SELECT *
                FROM migrations
                WHERE migration_name = $1
            `,

                    [file]

                );

            if (existing.rows.length > 0) {
                console.log(`Skipping ${file}`);
                continue;
            }

            const sql = fs.readFileSync(
                path.join(
                    migrationDir,
                    file
                ),
                "utf8"
            );

            await pool.query(sql);

            console.log(
                `Applied ${file}`
            );

            await pool.query(

                `
            INSERT INTO migrations
            (
                migration_name
            )
            VALUES
            (
                $1
            )
        `,

                [file]

            );

        }

        console.log("Migration complete");
        process.exit(0);

    }catch(error){
        console.log("Migration failed:", error.message);
        process.exit(1);
    }

  

};

run();