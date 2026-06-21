
import { getMetricsService, getProcessingMetricsService } from "../services/metricsService.js";
import { successResponse, errorResponse } from "../utils/apiResponse.js";
import { ERROR_CODES } from "../constants/errorCodes.js";


export const getMetrics =
  async (req, res) => {
    const tenantId = req.tenantId;
    const metrics =
      await getMetricsService(tenantId);

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
      await getProcessingMetricsService(tenantId);

    successResponse(res, metrics);

  } catch(error) {

    next(error);

  }

};