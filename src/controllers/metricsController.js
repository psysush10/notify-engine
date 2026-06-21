
import { getMetricsDb, getProcessingMetricsDb } from "../repositories/eventRepository.js";
import { successResponse, errorResponse } from "../utils/apiResponse.js";
import { ERROR_CODES } from "../constants/errorCodes.js";


export const getMetrics =
  async (req, res) => {
    const tenantId = req.tenantId;
    const metrics =
      await getMetricsDb(
        tenantId
      );

    successResponse(res, metrics);
  };

export const getProcessingMetrics =
async (
  req,
  res,
  next
) => {

  try {
    
    const tenantId = req.tenantId;
    const metrics =
      await getProcessingMetricsDb(tenantId);

    successResponse(res, metrics);

  } catch(error) {

    next(error);

  }

};