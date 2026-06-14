import { notificationHistory } from "../store/notificationStore.js";
import { getEventsByTenantDb } from "../repositories/eventRepository.js";


export const getHistory =
async (req,res)=>{
console.log("TENANT ID:", req.tenantId);
  const history =
    await getEventsByTenantDb(
      req.tenantId
    );
console.log("HISTORY:", history);
  res.json(history);
};


export const getTenantHistory = (req, res) => {
  const { tenantId } = req.params;

  const filteredHistory = notificationHistory.filter(
    item => item.tenantId === tenantId
  );

  res.json(filteredHistory);
};