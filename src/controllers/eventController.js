import { processEvent } from "../services/eventProcessingService.js";
import { getTenantConfigDb } from "../repositories/tenantConfigRepository.js";
import { createAuditLogDb, getAuditTimelineDb } from "../repositories/eventAuditRepository.js";
import { eventRepository } from "../factories/respositoryFactory.js";
import { processEventInBackground } from "../services/backgroundEventProcessor.js";
import { canTenantProcessEvent} from "../services/usageService.js";
import { logger } from "../platform/logger/logger.js";


export const handleEvent = async (req, res) => {

  const event = req.body;
  const tenantId = req.tenantId;
  const requestId = `req_${Date.now()}`;
  event.requestId = requestId;
  event.tenantId = tenantId;

 

  try {

    const quotaCheck = await canTenantProcessEvent(tenantId);

    if (!quotaCheck.allowed) {

      logger.audit("Quota exceeded",{
        tenantId,
        plan: quotaCheck.plan,
        limit: quotaCheck.limit,
        currentUsage: quotaCheck.currentUsage
      });

      return res
        .status(429)
        .json({

          error:
            "Plan limit exceeded",

          plan:
            quotaCheck.plan,

          limit:
            quotaCheck.limit,

          currentUsage:
            quotaCheck.currentUsage

        });

    }

     await eventRepository.create({
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
      },

      replayedFromRequestId: null

    });

    await createAuditLogDb({

      requestId,

      tenantId,

      status: "PENDING",

      message:
        "Event created"

    });

    // setImmediate(() => {

    //   processEventInBackground(
    //     requestId,
    //     event,
    //     tenantId
    //   );

    // });

    logger.info("Event received",{
      requestId,
      tenantId,
      eventType: event.type
    });
    

    return res.status(202).json({
      requestId,
      status: "PENDING",
      message:
        "Event accepted for processing"
    });

  } catch (error) {

    await eventRepository.updateStatus(
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

    res.status(500).json({
      requestId,
      message: "Event processing failed",
      error: error.message
    });
  }
};

export const getEvents = async (req, res) => {

    try {

      const tenantId =
        req.tenantId;

      const {
        status,
        page = 1,
        limit = 10
      } = req.query;

      const events =
        await eventRepository.getEvents(
          tenantId,
          status,
          page,
          limit
        );

        console.log(
      "TENANT ID:",
      req.tenantId
    );

      res.json(events);

    } catch (error) {

      res.status(500).json({
        error: error.message
      });

    }
  };

export const getEventByRequestId = async (req, res) => {

    try {

      const {
        requestId
      } = req.params;

      const tenantId = req.tenantId;

      const event =
        await eventRepository.getByRequestIdAndTenant(
          requestId,
          tenantId
        );

      if (!event) {

        return res
          .status(404)
          .json({
            error:
              "Event not found"
          });
      }

      res.json(event);

    } catch (error) {

      res.status(500).json({
        error:
          error.message
      });

    }
  };

export const replayEvent = async (req, res) => {

    try {

      const {
        requestId
      } = req.params;

      const tenantId =
        req.tenantId;

      const event =
        await eventRepository.getByRequestIdAndTenant(
          requestId,
          tenantId
        );

      if (!event) {

        return res
          .status(404)
          .json({
            error:
              "Event not found"
          });
      }

      const newRequestId =
        `req_${Date.now()}`;

      const payload = {
        ...event.payload,
        requestId: newRequestId
      };

      payload.requestId =
        newRequestId;

      await eventRepository.create({

        requestId:
          newRequestId,

        tenantId,

        type:
          payload.type,

        project:
          payload.project,

        severity:
          payload.severity,

        status:
          "PENDING",

        failureReason:
          null,

        retryCount:
          0,

        payload,

        replayedFromRequestId: requestId
      });

      await createAuditLogDb({

        requestId,

        tenantId,

        status:
          "REPLAYED",

        message:
          `Replayed as ${newRequestId}`

      });

      await createAuditLogDb({

        requestId:
          newRequestId,

        tenantId,

        status: "PENDING",

        message:
          `Created from replay of ${requestId}`

      });

      res.json({

        message:
          "Replay created",

        newRequestId

      });

    } catch (error) {

      res.status(500).json({

        error:
          error.message

      });

    }
  };

export const getEventTimeline = async (req, res) => {

    try {

      const {
        requestId
      } = req.params;

      const tenantId =
        req.tenantId;

      const timeline =
        await getAuditTimelineDb(
          requestId,
          tenantId
        );

      res.json(timeline);

    } catch (error) {

      res.status(500).json({
        error:
          error.message
      });
    }
  };



