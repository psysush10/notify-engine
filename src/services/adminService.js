import {
 getAdminOverviewDb,
 getRevenueAnalyticsDb
}
from "../repositories/adminRepository.js";

import {
 getInvoicePreview
}
from "./billingService.js";

export const getAdminOverview =
async () => {

 const overview =
   await getAdminOverviewDb();

 return {

   ...overview,

   monthlyRevenue: 69

 };

};

export const getRevenueAnalytics =
async () => {

  return await getRevenueAnalyticsDb();

};