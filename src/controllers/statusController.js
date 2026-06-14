import { notificationHistory } from "../store/notificationStore.js";
import { getEventByRequestIdDb } from "../repositories/eventRepository.js";

export const getEventStatus =
async (req,res)=>{

 const event =
  await getEventByRequestIdDb(
   req.params.requestId
  );

 if(!event){
  return res.status(404).json({
   message:
    "Event not found"
  });
 }

 res.json({
  requestId:
   event.request_id,

  status:
   event.status
 });
};