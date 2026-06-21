import {
invoiceRepository
}
from "../factories/respositoryFactory.js";

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
    await invoiceRepository.createInvoice({

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

  return await invoiceRepository.getInvoices(
    tenantId
  );

};

export const markInvoicePaid = async (
  invoiceId
) => {

  return await invoiceRepository.updateInvoiceStatus(
    invoiceId,
    "PAID"
  );

};

