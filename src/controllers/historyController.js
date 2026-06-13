import { notificationHistory } from "../store/notificationStore.js";

export const getHistory = (req, res) => {
  res.json(notificationHistory);
};

export const getTenantHistory = (req, res) => {
  const { tenantId } = req.params;

  const filteredHistory = notificationHistory.filter(
    item => item.tenantId === tenantId
  );

  res.json(filteredHistory);
};