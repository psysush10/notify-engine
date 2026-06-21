import { pool } from "../config/db.js";

import {sqliteDb} from "../platform/sqlite/sqliteDb.js";

import { workerStatus } from "../workers/workerStatus.js";

import { getProcessingMetricsDb } from "../repositories/eventRepository.js";

export const health =
(
  req,
  res
) => {

  res.json({

    status: "UP",

    timestamp:
      new Date().toISOString(),

    requestId: req.requestId

  });

};

export const postgresHealth = async (
  req,
  res
) => {

  try {

    await pool.query(
      "SELECT 1"
    );

    res.json({

      status: "UP",

      database:
        "Postgres"

    });

  } catch(error){

    res.status(500).json({

      status:
        "DOWN",

      error:
        error.message

    });

  }

};

export const sqliteHealth =
(
  req,
  res
) => {

  sqliteDb.get(

    "SELECT 1",

    [],

    (error) => {

      if (error) {

        return res
          .status(500)
          .json({

            status:
              "DOWN",

            error:
              error.message

          });

      }

      res.json({

        status:
          "UP",

        database:
          "SQLite"

      });

    }

  );

};

export const workerHealth =
(
  req,
  res
) => {

  res.json({

    status:
      "UP",

    lastRun:
      workerStatus.lastRun,

    lastClaimCount:
      workerStatus.lastClaimCount

  });

};


export const platformHealth = async (
  req,
  res
) => {

  try {

    await pool.query(
      "SELECT 1"
    );

    const processingMetrics = {
      total_events: 0,
      success_count: 0,
      failed_count: 0,
      avg_processing_seconds: 0
    };

    res.json({

      platform: "UP",

      requestId:
        req.requestId,

      postgres: "UP",

      sqlite: "UP",

      worker: {

        status: "UP",

        lastRun:
          workerStatus.lastRun,

        lastClaimCount:
          workerStatus.lastClaimCount

      },

      processing: {

        totalEvents:
          Number(
            processingMetrics.total_events || 0
          ),

        successCount:
          Number(
            processingMetrics.success_count || 0
          ),

        failedCount:
          Number(
            processingMetrics.failed_count || 0
          ),

        avgProcessingSeconds:
          Number(
            processingMetrics.avg_processing_seconds || 0
          )

      }

    });

  } catch (error) {

    res.status(500).json({

      platform: "DOWN",

      error:
        error.message

    });

  }

};

