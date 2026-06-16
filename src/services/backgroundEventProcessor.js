import { getTenantConfigDb } from "../repositories/tenantConfigRepository.js";

import { updateEventStatusDb } from "../repositories/eventRepository.js";

import { processEvent } from "./eventProcessingService.js";

import { createAuditLogDb } from "../repositories/eventAuditRepository.js";

import { incrementUsageDb } from "../repositories/usageRepository.js";

export const processEventInBackground =
  async (
    requestId,
    event,
    tenantId
  ) => {

    try {

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

      await updateEventStatusDb(
        requestId,
        eventStatus,
        failureReason
      );

      if (
        eventStatus === "SUCCESS"
      ) {

        await incrementUsageDb(
          tenantId
        );

      }

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

      console.error(
        `[${tenantId}] Background processing failed`,
        requestId,
        error.message
      );

      await updateEventStatusDb(
        requestId,
        "FAILED",
        error.message
      );
    }
  };