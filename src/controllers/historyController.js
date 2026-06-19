
import { getEventsByTenantDb } from "../repositories/eventRepository.js";


export const getHistory =
async (req,res)=>{


  console.log(
    "REQ TENANT:",
    req.tenantId
  );
  const history =
    await getEventsByTenantDb(
      req.tenantId
    );
console.log("HISTORY:", history);
  res.json(history);
};

