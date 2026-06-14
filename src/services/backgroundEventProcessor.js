import { getTenantConfigDb } from "../repositories/tenantConfigRepository.js";

import { updateEventStatusDb } from "../repositories/eventRepository.js";

import { processEvent } from "./eventProcessingService.js";

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

      await updateEventStatusDb(
        requestId,
        eventStatus,
        failureReason
      );

    } catch (error) {

      console.error(
        "Background processing failed:",
        error.message
      );

      await updateEventStatusDb(
        requestId,
        "FAILED",
        error.message
      );
    }
  };