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
  tenantId
) => {

  const result =
    await pool.query(

      `
      SELECT *
      FROM import_jobs
      WHERE tenant_id = $1
      ORDER BY id DESC
      `,

      [tenantId]

    );

  return result.rows;

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

