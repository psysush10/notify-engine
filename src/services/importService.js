import {

  createImportJobDb,
  getImportJobsDb,
  getImportJobDb,
  updateImportJobStatusDb

}
from "../repositories/importRepository.js";

export const startImportJob =
async (
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

export const getImportJobs =
async (
  tenantId
) => {

  return await getImportJobsDb(
    tenantId
  );

};

export const getImportJob =
async (
  id
) => {

  return await getImportJobDb(
    id
  );

};

export const completeImportJob =
async (
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