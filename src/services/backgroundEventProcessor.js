import { processEvent } from "./eventProcessingService.js";

import { eventRepository, usageRepository, auditRepository, tenantConfigRepository} from "../factories/respositoryFactory.js";

import { logger } from "../platform/logger/logger.js";


export const processEventInBackground =
  async (
    requestId,
    event,
    tenantId
  ) => {

    try {

      await eventRepository.updateProcessingStart(requestId);

      const config =
        await tenantConfigRepository.getConfig(
          tenantId
        );

      const {
        eventStatus,
        failureReason
      } = await processEvent(
        event,
        config
      );

      await auditRepository.createLog(
        tenantId,
        "PROCESSING",
        {
          requestId,
          message:
          "Worker started processing"
        }
      );

      await eventRepository.updateStatus(
        requestId,
        eventStatus,
        failureReason
      );

      if (
        eventStatus === "SUCCESS"
      ) {

        await usageRepository.incrementUsage(
          tenantId
        );

      }

      await eventRepository.updateProcessingComplete(requestId);

      await auditRepository.createLog(

        tenantId,

        eventStatus,

        {requestId,
          message: failureReason || "Processing completed"
        }

      );

      

    } catch (error) {

      await auditRepository.createLog(
        tenantId,
        "FAILED",
        {
          requestId,
          message: error.message
        }
        );

      logger.error("Background processing failed",
        { 
          requestId,
          tenantId,
          error: error.message 

        }
      );

      await eventRepository.updateProcessingComplete(requestId);

      await eventRepository.updateStatus(
        requestId,
        "FAILED",
        error.message
      );
    }
  };