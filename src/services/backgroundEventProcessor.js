import { getTenantConfigDb } from "../repositories/tenantConfigRepository.js";

import { eventRepository } from "../factories/respositoryFactory.js"

import { processEvent } from "./eventProcessingService.js";

import { createAuditLogDb } from "../repositories/eventAuditRepository.js";

import { usageRepository } from "../factories/respositoryFactory.js";

import { logger } from "../platform/logger/logger.js";

import { updateEventProcessingStartDb, updateEventProcessingCompleteDb } from "../repositories/eventRepository.js";

export const processEventInBackground =
  async (
    requestId,
    event,
    tenantId
  ) => {

    try {

      await updateEventProcessingStartDb(requestId);

      const config =
        await getTenantConfigDb(
          tenantId
        );

      const {
        eventStatus,
        failureReason
      } = await processEvent(
        event,
        config
      );

      await createAuditLogDb({

        requestId,

        tenantId,

        status:
          "PROCESSING",

        message:
          "Worker started processing"

      });

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

      await updateEventProcessingCompleteDb(requestId);

      await createAuditLogDb({

        requestId,

        tenantId,

        status:
          eventStatus,

        message:
          failureReason ||
          "Processing completed"

      });

      

    } catch (error) {

      await createAuditLogDb({
        requestId,
        tenantId,
        status: "FAILED",
        message: error.message
      });

      logger.error("Background processing failed",
        { 
          requestId,
          tenantId,
          error: error.message 

        }
      );

      await updateEventProcessingCompleteDb(requestId);

      await eventRepository.updateStatus(
        requestId,
        "FAILED",
        error.message
      );
    }
  };