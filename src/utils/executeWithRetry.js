import { retry } from "./retry.js";

import { incrementRetryCountDb } from "../repositories/eventRepository.js";

export const executeWithRetry =
    async (
        requestId,
        operation
    ) => {

        return retry(

            operation,

            async () => {

                await incrementRetryCountDb(
                    requestId
                );

                console.log(
                    `Retry count incremented for ${requestId}`
                );
            }

        );

    };