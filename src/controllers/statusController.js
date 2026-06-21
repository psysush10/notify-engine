
import { NotFoundError } from "../errors/NotFoundError.js";
import { getEventStatusService } from "../services/statusService.js";

export const getEventStatus = async (req,res)=>{

 const event =
  await getEventStatusService(
   req.params.requestId
  );

 if(!event){
  throw new NotFoundError("Event not found");
 }

 res.json({
  requestId:
   event.request_id,

  status:
   event.status
 });
};

export const environmentHealth =
(
  req,
  res
) => {

  res.json({

    database:
      !!process.env.DATABASE_URL,

    sessionSecret:
      !!process.env.SESSION_SECRET,

    adminUser:
      !!process.env.ADMIN_USERNAME

  });

};