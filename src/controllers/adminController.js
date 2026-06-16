import {
 getAdminOverview,
 getRevenueAnalytics
}
from "../services/adminService.js";

export const getAdminOverviewApi = async (
 req,
 res
) => {

 try {

   const data =
     await getAdminOverview();

   res.json(
     data
   );

 } catch (error) {

   res.status(500).json({

     error:
       error.message

   });

 }

};

export const getRevenueAnalyticsApi = async (
  req,
  res
) => {

  try {

    const analytics =
      await getRevenueAnalytics();

    res.json(
      analytics
    );

  } catch (error) {

    res.status(500).json({

      error:
        error.message

    });

  }

};

