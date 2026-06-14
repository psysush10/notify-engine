import {claimPendingEventsDb, recoverStaleProcessingEventsDb } from '../repositories/eventRepository.js' 
import { processEventInBackground } from "../services/backgroundEventProcessor.js";

export const startEventWorker = () => { 
    
    console.log( "Event Worker Started" );
    
    setInterval( async () => { 


        const recoveredEvents = await recoverStaleProcessingEventsDb();

        if (recoveredEvents.length > 0) {

            console.log(`Recovered ${recoveredEvents.length} stale events`);

        }

        const events = await claimPendingEventsDb();
        console.log(`Claimed ${events.length} events`);
        console.log( `Pending events: ${events.length}` );

        for (const event of events) {

            console.log(
                `Processing ${event.request_id}`
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