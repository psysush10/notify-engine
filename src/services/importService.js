import fs from "fs";
import csv from "csv-parser";

import {

  createImportJobDb,
  getImportJobsDb,
  getImportJobDb,
  updateImportJobStatusDb

}
from "../repositories/importRepository.js";

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
  tenantId
) => {

  return await getImportJobsDb(
    tenantId
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

  await updateImportJobStatusDb(
    importJobId,
    "PROCESSING",
    0,
    0
  );

  return new Promise(
    (resolve, reject) => {

      let rowsProcessed = 0;

      fs
        .createReadStream(filePath)
        .pipe(csv())
        .on("data", () => {

          rowsProcessed++;

        })
        .on("end", async () => {

          await updateImportJobStatusDb(
            importJobId,
            "COMPLETED",
            rowsProcessed,
            0
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

};