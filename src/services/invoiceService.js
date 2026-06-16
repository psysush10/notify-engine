import {
 createInvoiceDb,
 getInvoicesByTenantDb,
 updateInvoiceStatusDb
}
from "../repositories/invoiceRepository.js";

import {
 getInvoicePreview
}
from "./billingService.js";

export const generateInvoice = async (tenantId) => {

  const preview =
    await getInvoicePreview(
      tenantId
    );

  const invoice =
    await createInvoiceDb({

      tenantId,

      invoiceMonth:
        preview.month,

      plan:
        preview.plan,

      usageCount:
        preview.usage,

      basePrice:
        preview.basePrice,

      overage:
        preview.overage,

      totalAmount:
        preview.total,

      status:
        "OPEN"

    });

  return invoice;

};

export const getInvoices = async (tenantId) => {

  return await getInvoicesByTenantDb(
    tenantId
  );

};

export const markInvoicePaid = async (
  invoiceId
) => {

  return await updateInvoiceStatusDb(
    invoiceId,
    "PAID"
  );

};

