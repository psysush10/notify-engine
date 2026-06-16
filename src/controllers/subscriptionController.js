import {
  getSubscription,
  upgradeSubscription
}
from "../services/subscriptionService.js";

export const getSubscriptionApi = async (
  req,
  res
) => {

  try {

    const subscription =
      await getSubscription(
        req.tenantId
      );

    if (!subscription) {

      return res
        .status(404)
        .json({
          error:
            "Subscription not found"
        });

    }

    res.json({

      tenantId:
        subscription.tenant_id,

      plan:
        subscription.plan,

      status:
        subscription.status,

      startDate:
        subscription.start_date,

      endDate:
        subscription.end_date

    });

  } catch (error) {

    res.status(500).json({

      error:
        error.message

    });

  }

};

export const updateSubscriptionApi = async (
  req,
  res
) => {

  try {

    const {
      plan
    } = req.body;

    const result =
      await upgradeSubscription(
        req.tenantId,
        plan
      );

    res.json({

      message:
        "Subscription upgraded",

      subscription:
        result

    });

  } catch (error) {

    res.status(500).json({

      error:
        error.message

    });

  }

};