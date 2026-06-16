import {claimPendingEventsDb, markDeadEventsDb, recoverStaleProcessingEventsDb } from '../repositories/eventRepository.js' 
import { processEventInBackground } from "../services/backgroundEventProcessor.js";

export const startEventWorker = () => { 
    
    console.log( "Event Worker Started" );
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
        console.log(`Claimed ${events.length} events`);
        console.log( `Pending events: ${events.length}` );

        for (const event of events) {

            console.log(
                `[${event.tenant_id}] Processing ${event.request_id}`
            );

            if (!event.payload) {

                console.error(
                    `Skipping ${event.request_id} - payload missing`
                );

                await updateEventStatusDb(
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