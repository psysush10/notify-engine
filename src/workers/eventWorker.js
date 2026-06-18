import {claimPendingEventsDb, markDeadEventsDb, recoverStaleProcessingEventsDb } from '../repositories/eventRepository.js' 
import { processEventInBackground } from "../services/backgroundEventProcessor.js";
import { eventRepository } from '../factories/respositoryFactory.js';
import { logger } from '../platform/logger/logger.js';
import { workerStatus } from './workerStatus.js';

export const startEventWorker = () => { 
    
    logger.info("Event Worker Started");
    const MAX_PROCESSING_ATTEMPTS = 3;
    
    setInterval( async () => { 

        const deadEvents =
            await markDeadEventsDb(
                MAX_PROCESSING_ATTEMPTS
            );

        if (deadEvents.length > 0) {

            console.log(
                `Marked ${deadEvents.length} events DEAD`
            );

        }

        const recoveredEvents = await recoverStaleProcessingEventsDb(5,MAX_PROCESSING_ATTEMPTS);

        if (recoveredEvents.length > 0) {

            console.log(`Recovered ${recoveredEvents.length} stale events`);

        }

        const events = await claimPendingEventsDb();
        workerStatus.lastRun = new Date().toISOString();
        workerStatus.lastClaimCount = events.length;
        
        logger.info("Events claimed", {
            count: events.length
        });
        console.log( `Pending events: ${events.length}` );

        for (const event of events) {

            console.log(
                `[${event.tenant_id}] Processing ${event.request_id}`
            );

            if (!event.payload) {

                logger.error("Payload missing",{
                    requestId:event.request_id
                });

                await eventRepository.updateStatus(
                    event.request_id,
                    "FAILED",
                    "Payload missing"
                );

                continue;
            }

            await processEventInBackground(
                event.request_id,
                event.payload,
                event.tenant_id
            );
        }
     }, 10000 );


};