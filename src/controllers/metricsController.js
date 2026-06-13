import { notificationHistory } from "../store/notificationStore.js";

export const getMetrics = (req, res) => {

  const totalEvents = notificationHistory.length;

  const successfulEvents =
    notificationHistory.filter(
      item => item.status === "SUCCESS"
    ).length;

  const failedEvents =
    notificationHistory.filter(
      item => item.status === "FAILED"
    ).length;

  const successRate =
    totalEvents
      ? (
        successfulEvents /
        totalEvents *
        100
      ).toFixed(2)
      : 0;
  
  const counts = {};

  notificationHistory.forEach(
    item => {
      counts[item.type] = 
      (counts[item.type] || 0)
      + 1;
    }
  );

  const topEventType = Object.keys(counts)
  .reduce(
    (a,b)=>
      counts[a] > counts[b]
    ? a
    : b,
    Object.keys(counts)[0]
  );

  const uniqueTenants =
    new Set(
      notificationHistory.map(
        item => item.tenantId
      )
    ).size;

  res.json({
    totalEvents,
    successfulEvents,
    failedEvents,
    successRate,
    tenants: uniqueTenants,
    topEventType
  });
};