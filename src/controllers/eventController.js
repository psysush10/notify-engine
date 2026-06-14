import { processEvent } from "../services/eventProcessingService.js";
import { getTenantConfigDb } from "../repositories/tenantConfigRepository.js";
import { notificationHistory } from "../store/notificationStore.js";
import { createEventDb, getEventByRequestIdDb, updateEventStatusDb } from "../repositories/eventRepository.js";
import { processEventInBackground } from "../services/backgroundEventProcessor.js";
export const handleEvent = async (req, res) => {

  const event = req.body;
  const tenantId = req.tenantId;
  const requestId = `req_${Date.now()}`;
  event.requestId = requestId;
  event.tenantId = tenantId;

 

  try {

     await createEventDb({
      requestId,
      tenantId,
      type:
        event.type,

      project:
        event.project,

      severity:
        event.severity,

      status:
        "PENDING",

      failureReason: null,

      retryCount:0,

      payload: {
        ...event
      }

    });

    // setImmediate(() => {

    //   processEventInBackground(
    //     requestId,
    //     event,
    //     tenantId
    //   );

    // });

    console.log("Received event:", event);
    

    return res.status(202).json({
      requestId,
      status: "PENDING",
      message:
        "Event accepted for processing"
    });

  } catch (error) {

    await updateEventStatusDb(
    requestId,
    "FAILED",
    error.message
  );

    console.error(
      requestId,
      "FAILED",
      "Event processing failed:",
      error.message
    );


    // FAILURE HISTORY
    // notificationHistory.push({
    //   requestId,
    //   tenantId,
    //   type: event.type,
    //   project: event.project,
    //   severity: event.severity,
    //   status: eventStatus,
    //   error: error.message,
    //   timestamp: new Date().toISOString(),
    //   retryCount: "N/A"
    // });

    res.status(500).json({
      requestId,
      message: "Event processing failed",
      error: error.message
    });
  }
};



