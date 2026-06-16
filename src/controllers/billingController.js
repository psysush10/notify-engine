import {

  getBillingAccount,
  updateBillingAccount

}
from "../services/billingAccountService.js";

import { getInvoicePreview } from "../services/billingService.js";

export const getBillingAccountApi = async (
  req,
  res
) => {

  const account =
    await getBillingAccount(
      req.tenantId
    );

  res.json(account);

};

export const updateBillingAccountApi = async (
  req,
  res
) => {

  const {

    billingEmail,
    companyName

  } = req.body;

  const account =
    await updateBillingAccount(

      req.tenantId,

      billingEmail,

      companyName

    );

  res.json(account);

};

export const getInvoicePreviewApi = async (
  req,
  res
) => {

  try {

    const invoice =
      await getInvoicePreview(
        req.tenantId
      );

    res.json(
      invoice
    );

  } catch (error) {

    res.status(500).json({

      error:
        error.message

    });

  }

};

