import {
  upgradeSubscription
}
from "../services/subscriptionService.js";

import { createAuditLog } from "../services/auditService.js";
import { billingConfig } from "../config/billing.js";

export const upgradeTenantPlan =
async (
  req,
  res
) => {

  try {

    const tenantId =
      req.params.tenantId;

    const {plan} = req.body;

    if (!billingConfig.plans.includes(plan)) {

      return res
        .status(400)
        .send(
          "Invalid plan"
        );

    }

    await upgradeSubscription(
      tenantId,
      plan
    );

    await createAuditLog(

      tenantId,

      "PLAN_UPDATED",

      {
        newPlan: plan
      }

    );

    res.redirect(
      `/admin/tenant/${tenantId}`
    );

  } catch(error){

    res.status(500).send(
      error.message
    );

  }

};