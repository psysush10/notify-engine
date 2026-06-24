import {

  startImportJob,
  getImportJobs,
  getImportJob

}
from "../services/importService.js";

export const createImportJobApi =
async (
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

export const getImportJobsApi =
async (
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

export const getImportJobApi =
async (
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