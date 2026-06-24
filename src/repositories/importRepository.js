import {pool} from "../config/db.js";

export const createImportJobDb = async (
  tenantId,
  jobType,
  fileName
) => {

  const result =
    await pool.query(

      `
      INSERT INTO import_jobs
      (
        tenant_id,
        job_type,
        file_name,
        status
      )
      VALUES
      (
        $1,
        $2,
        $3,
        'PENDING'
      )
      RETURNING *
      `,

      [
        tenantId,
        jobType,
        fileName
      ]

    );

  return result.rows[0];

};

export const getImportJobsDb = async (
  tenantId,
  filters
) => {

  const {
    status,
    jobType,
    page = 1,
    limit = 10
  } = filters;

  const offset =
    (page - 1) * limit;

  let whereClause =
    "WHERE tenant_id = $1";

  const values = [tenantId];

  let index = 2;

  if (status) {

    whereClause +=
      ` AND status = $${index}`;

    values.push(status);

    index++;

  }

  if (jobType) {

    whereClause +=
      ` AND job_type = $${index}`;

    values.push(jobType);

    index++;

  }

  const dataQuery = `
    SELECT *
    FROM import_jobs
    ${whereClause}
    ORDER BY created_at DESC
    LIMIT $${index}
    OFFSET $${index + 1}
  `;

  values.push(limit);
  values.push(offset);

  const dataResult =
    await pool.query(
      dataQuery,
      values
    );

  const countValues =
    values.slice(
      0,
      values.length - 2
    );

  const countQuery = `
    SELECT COUNT(*) AS total
    FROM import_jobs
    ${whereClause}
  `;

  const countResult =
    await pool.query(
      countQuery,
      countValues
    );

  return {

    jobs:
      dataResult.rows,

    total:
      Number(
        countResult
          .rows[0]
          .total
      )

  };

};

export const getImportJobDb = async (
  id
) => {

  const result =
    await pool.query(

      `
      SELECT *
      FROM import_jobs
      WHERE id = $1
      `,

      [id]

    );

  return result.rows[0];

};

export const updateImportJobStatusDb = async (
  id,
  status,
  rowsProcessed,
  rowsFailed
) => {

  const result =
    await pool.query(

      `
      UPDATE import_jobs
      SET
        status=$2,
        rows_processed=$3,
        rows_failed=$4,
        completed_at=NOW()
      WHERE id=$1
      RETURNING *
      `,

      [
        id,
        status,
        rowsProcessed,
        rowsFailed
      ]

    );

  return result.rows[0];

};

export const updateImportFilePathDb = async (
    id,
    filePath
  ) => {

    const result =
      await pool.query(

        `
        UPDATE import_jobs
        SET file_path = $2
        WHERE id = $1
        RETURNING *
        `,

        [
          id,
          filePath
        ]

      );

    return result.rows[0];

};

export const createImportErrorDb = async (
    importJobId,
    rowNumber,
    errorMessage
  ) => {

    const result =
      await pool.query(

        `
        INSERT INTO import_errors
        (
          import_job_id,
          row_number,
          error_message
        )
        VALUES
        (
          $1,
          $2,
          $3
        )
        RETURNING *
        `,

        [
          importJobId,
          rowNumber,
          errorMessage
        ]

      );

    return result.rows[0];

};

export const getImportErrorsDb = async (
    importJobId
  ) => {

    const result =
      await pool.query(

        `
        SELECT
          row_number,
          error_message
        FROM import_errors
        WHERE import_job_id = $1
        ORDER BY row_number
        `,

        [
          importJobId
        ]

      );

    return result.rows;

};

export const createRetryImportJobDb = async (
    originalJob
  ) => {

    const result =
      await pool.query(

        `
        INSERT INTO import_jobs
        (
          tenant_id,
          job_type,
          file_name,
          file_path,
          status,
          retried_from_job_id
        )
        VALUES
        (
          $1,
          $2,
          $3,
          $4,
          'PENDING',
          $5
        )
        RETURNING *
        `,

        [
          originalJob.tenant_id,
          originalJob.job_type,
          originalJob.file_name,
          originalJob.file_path,
          originalJob.id
        ]

      );

    return result.rows[0];

};

export const getImportMetricsDb = async (
    tenantId
  ) => {

    const result =
      await pool.query(

        `
        SELECT

          COUNT(*) AS total_imports,

          COUNT(
            CASE
              WHEN status = 'COMPLETED'
              THEN 1
            END
          ) AS completed_imports,

          COUNT(
            CASE
              WHEN rows_failed > 0
              THEN 1
            END
          ) AS failed_imports,

          COUNT(
            CASE
              WHEN status = 'PROCESSING'
              THEN 1
            END
          ) AS processing_imports

        FROM import_jobs

        WHERE tenant_id = $1
        `,

        [
          tenantId
        ]

      );

    return result.rows[0];

};

export const getRecentImportJobsDb = async (
    tenantId
  ) => {

    const result =
      await pool.query(

        `
        SELECT
          id,
          job_type,
          file_name,
          status,
          rows_processed,
          rows_failed,
          created_at
        FROM import_jobs
        WHERE tenant_id = $1
        ORDER BY created_at DESC
        LIMIT 5
        `,

        [
          tenantId
        ]

      );

    return result.rows;

};

export const getRecentFailuresDb = async (
    tenantId
  ) => {

    const result =
      await pool.query(

        `
        SELECT
          id,
          file_name,
          rows_failed,
          created_at
        FROM import_jobs
        WHERE
          tenant_id = $1
          AND rows_failed > 0
        ORDER BY created_at DESC
        LIMIT 5
        `,

        [
          tenantId
        ]

      );

    return result.rows;

  };
