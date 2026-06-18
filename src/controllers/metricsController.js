import { notificationHistory } from "../store/notificationStore.js";
import { getMetricsDb, getProcessingMetricsDb } from "../repositories/eventRepository.js";


export const getMetrics =
  async (req, res) => {
    const tenantId = req.tenantId;
    const metrics =
      await getMetricsDb(
        tenantId
      );

    res.json(metrics);
  };

export const getProcessingMetrics =
async (
  req,
  res
) => {

  try {
    const tenantId = req.tenantId;
    const metrics =
      await getProcessingMetricsDb(tenantId);

    res.json(metrics);

  } catch(error) {

    res.status(500).json({

      error:
        error.message

    });

  }

};