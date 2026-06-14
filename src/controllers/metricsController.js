import { notificationHistory } from "../store/notificationStore.js";
import { getMetricsDb } from "../repositories/eventRepository.js";


export const getMetrics =
  async (req, res) => {
    const metrics =
      await getMetricsDb(
        req.tenantId
      );

    res.json(metrics);
  };