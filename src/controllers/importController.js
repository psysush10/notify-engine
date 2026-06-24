import {

  startImportJob,
  getImportJobs,
  getImportJob

}
from "../services/importService.js";

import { processCsvFile } from "../services/importService.js";

export const createImportJobApi = async (
  req,
  res
) => {

  const {

    jobType,
    fileName

  } = req.body;

  const job =
    await startImportJob(

      req.tenantId,

      jobType,

      fileName

    );

  res.status(201)
    .json(job);

};

export const getImportJobsApi = async (
  req,
  res
) => {

  const jobs =
    await getImportJobs(
      req.tenantId
    );

  res.json(
    jobs
  );

};

export const getImportJobApi = async (
  req,
  res
) => {

  const job =
    await getImportJob(
      req.params.id
    );

  res.json(
    job
  );

};

export const updateImportStatusDb = async (
  id,
  status
) => {

  const query = `
    UPDATE import_jobs
    SET status = $2
    WHERE id = $1
    RETURNING *
  `;

  const result =
    await pool.query(
      query,
      [id, status]
    );

  return result.rows[0];
};

export const updateImportProgressDb = async (
  id,
  rowsProcessed,
  rowsFailed
) => {

  const query = `
    UPDATE import_jobs
    SET
      rows_processed = $2,
      rows_failed = $3
    WHERE id = $1
    RETURNING *
  `;

  const result =
    await pool.query(
      query,
      [
        id,
        rowsProcessed,
        rowsFailed
      ]
    );

  return result.rows[0];
};

export const processImportJobHandler = async (req, res) => {

    try {

      const importJobId =
        req.params.id;

      await processCsvFile(
        importJobId,
        "sample-data/customers.csv"
      );

      return res.json({
        message:
          "CSV processed successfully"
      });

    } catch (error) {

      return res
        .status(500)
        .json({
          message:
            error.message
        });
    }
  };