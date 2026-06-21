
import { getHistoryService } from "../services/historyService.js";


export const getHistory =
async (req,res)=>{
  const history =
    await getHistoryService(
      req.tenantId
    );
  res.json(history);
};

