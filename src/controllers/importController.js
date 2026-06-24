import {

  startImportJob,
  getImportJobs,
  getImportJob,
  attachFileToImportJob,
  getImportErrors,
  retryImportJob

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

    try {

        console.log(req.user);

      const tenantId = req.tenantId;

      const {
        status,
        jobType,
        page = 1,
        limit = 10
      } = req.query;

      const result =
        await getImportJobs(
          tenantId,
          {
            status,
            jobType,
            page:
              Number(page),

            limit:
              Number(limit)
          }
        );

      return res.json({

        data:
          result.jobs,

        pagination: {

          page:
            Number(page),

          limit:
            Number(limit),

          total:
            result.total,

          totalPages:
            Math.ceil(
              result.total /
              Number(limit)
            )

        }

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
        const job =
            await getImportJob(
                req.params.id
            );

        if (
            job.status ===
            "PROCESSING"
        ) {

            return res
                .status(409)
                .json({

                    message:
                        "Import already processing"

                });

        }

        processCsvFile(
            job.id,
            job.file_path
        ).catch(console.error)

      return res
            .status(202)
            .json({

                message:
                    "Import accepted",

                importJobId:
                    job.id,

                status:
                    "PROCESSING"

            });
    }catch(error){
        console.log(error);
    }
};

export const uploadCsvHandler = async (
    req,
    res
  ) => {

    try {


      const {
        tenantId,
        jobType
      } = req.body;

      const job =
        await startImportJob(
          tenantId,
          jobType,
          req.file.originalname
        );

      await attachFileToImportJob(
        job.id,
        req.file.path
      );

      return res
        .status(201)
        .json({

          jobId:
            job.id,

          status:
            "PENDING",

          fileName:
            req.file.originalname

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

export const getImportErrorsApi = async (
    req,
    res
  ) => {

    try {

      const errors =
        await getImportErrors(
          req.params.id
        );

      return res.json(
        errors
      );

    } catch (error) {

      return res
        .status(500)
        .json({

          message:
            error.message

        });

    }

};

export const retryImportJobApi = async (
    req,
    res
  ) => {

    try {

      const job =
        await retryImportJob(
          req.params.id
        );

        processCsvFile(
            job.id,
            job.file_path
        ).catch(console.error);

      return res
        .status(201)
        .json({

          message:
            "Retry job created",

          jobId:
            job.id

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

