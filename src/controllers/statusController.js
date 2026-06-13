import { notificationHistory }
from "../store/notificationStore.js";

export const getEventStatus = (
  req,
  res
) => {

  const { requestId } =
    req.params;

  const event =
    notificationHistory.find(
      item =>
      item.requestId === requestId
    );

  if(!event){
    return res.status(404).json({
      message: "Request not found"
    });
  }

  res.json({
    requestId,
    status: event.status,
    timestamp: event.timestamp
  });
};