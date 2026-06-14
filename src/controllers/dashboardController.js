import { getDashboardDb } from "../repositories/eventRepository.js";

export const getDashboard =
    async (req, res) => {

        const dashboard =
            await getDashboardDb();

        res.json({
            totalEvents:
                Number(
                    dashboard.total_events
                ),

            successfulEvents:
                Number(
                    dashboard.success_events
                ),

            failedEvents:
                Number(
                    dashboard.failed_events
                ),

            activeTenants:
                Number(
                    dashboard.active_tenants
                ),

            successRate:
                Number(
                    dashboard.total_events
                ) > 0
                    ? Math.round(
                        (
                            Number(
                                dashboard.success_events
                            ) /
                            Number(
                                dashboard.total_events
                            )
                        ) * 100
                    )
                    : 0
        });
    };