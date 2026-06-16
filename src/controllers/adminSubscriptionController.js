import {
  upgradeSubscription
}
from "../services/subscriptionService.js";

export const upgradeTenantPlan =
async (
  req,
  res
) => {

  try {

    const tenantId =
      req.params.tenantId;

    const {
      plan
    } = req.body;

    await upgradeSubscription(
      tenantId,
      plan
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