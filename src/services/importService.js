import fs from "fs";
import csv from "csv-parser";

import {

  createImportJobDb,
  getImportJobsDb,
  getImportJobDb,
  updateImportJobStatusDb,
  updateImportFilePathDb,
  createImportErrorDb,
  getImportErrorsDb,
  createRetryImportJobDb,
  getImportMetricsDb,
  getRecentImportJobsDb,
  getRecentFailuresDb

}
from "../repositories/importRepository.js";

import { validateCustomerRow } from "../utils/importValidation.js";

export const startImportJob = async (
  tenantId,
  jobType,
  fileName
) => {

  return await createImportJobDb(
    tenantId,
    jobType,
    fileName
  );

};

export const getImportJobs = async (
  tenantId,
  filters
) => {

  return await getImportJobsDb(
    tenantId,
    filters
  );

};

export const getImportJob = async (
  id
) => {

  return await getImportJobDb(
    id
  );

};

export const completeImportJob = async (
  id,
  rowsProcessed,
  rowsFailed
) => {

  return await updateImportJobStatusDb(

    id,

    "COMPLETED",

    rowsProcessed,

    rowsFailed

  );

};

export const processCsvFile = async (
  importJobId,
  filePath
) => {

    try{
  await updateImportJobStatusDb(
    importJobId,
    "PROCESSING",
    0,
    0
  );

  
  return new Promise(
    (resolve, reject) => {
        
        let rowNumber = 1;
        let rowsProcessed = 0;
        let rowsFailed = 0;

      fs
        .createReadStream(filePath)
        .pipe(csv())
        .on("data", async (row) => {
            const errors =
                validateCustomerRow(
                    row
                );

            if (
                errors.length > 0
            ) {

                rowsFailed++;

                await createImportErrorDb(
                    importJobId,
                    rowNumber,
                    errors.join(", ")
                );

            } else {

                rowsProcessed++;

            }

            rowNumber++;

        })
        .on("end", async () => {

          await updateImportJobStatusDb(
            importJobId,
            "COMPLETED",
            rowsProcessed,
            rowsFailed
          );

          resolve();

        })
        .on("error", async (error) => {

          await updateImportJobStatusDb(
            importJobId,
            "FAILED",
            rowsProcessed,
            0
          );

          reject(error);

        });

    }
  );
}catch(error){
        await updateImportJobStatusDb(

            importJobId,

            "FAILED",

            0,

            0

        );

        throw error;
}

};

export const attachFileToImportJob = async (
    importJobId,
    filePath
  ) => {

    return await updateImportFilePathDb(
      importJobId,
      filePath
    );

};

export const getImportErrors = async (
    importJobId
  ) => {

    return await getImportErrorsDb(
      importJobId
    );
};

export const retryImportJob = async (
    jobId
  ) => {

    const originalJob =
      await getImportJobDb(
        jobId
      );

    if (
      !originalJob
    ) {

      throw new Error(
        "Import job not found"
      );

    }

    return await
      createRetryImportJobDb(
        originalJob
      );

};

export const getImportMetrics = async (
    tenantId
  ) => {

    const metrics =
      await getImportMetricsDb(
        tenantId
      );

    const total =
      Number(
        metrics.total_imports
      );

    const completed =
      Number(
        metrics.completed_imports
      );

    return {

      totalImports:
        total,

      completedImports:
        completed,

      failedImports:
        Number(
          metrics.failed_imports
        ),

      processingImports:
        Number(
          metrics.processing_imports
        ),

      successRate:
        total === 0
          ? 0
          : Number(
              (
                completed /
                total *
                100
              ).toFixed(2)
            )

    };
};

export const getImportDashboard = async (
    tenantId
  ) => {

    const metrics =
      await getImportMetrics(
        tenantId
      );

    const recentImports =
      await getRecentImportJobsDb(
        tenantId
      );

    const recentFailures =
      await getRecentFailuresDb(
        tenantId
      );

    return {

      metrics,

      recentImports,

      recentFailures

    };

  };