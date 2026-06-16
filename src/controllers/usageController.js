import {
  getUsageSummary,
  getMonthlyUsageSummary
}
from "../services/billingService.js";

export const getUsage = async (
  req,
  res
) => {

  try {

    const usage =
      await getUsageSummary(
        req.tenantId
      );

    res.json(
      usage
    );

  } catch (error) {

    res.status(500).json({

      error:
        error.message

    });

  }

};

export const getMonthlyUsage = async (
  req,
  res
) => {

  const result =
    await getMonthlyUsageSummary(
      req.tenantId
    );

  res.json(
    result
  );

};