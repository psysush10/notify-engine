import {

  createInvoiceDb,
  getInvoicesByTenantDb,
  updateInvoiceStatusDb

}
from "../../repositories/invoiceRepository.js";

export class PostgresInvoiceRepository {

  async createInvoice(
    invoice
  ) {

    return await createInvoiceDb(
      invoice
    );

  }

  async getInvoices(
    tenantId
  ) {

    return await getInvoicesByTenantDb(
      tenantId
    );

  }

  async updateInvoiceStatus(
    invoiceId,
    status
  ) {

    return await updateInvoiceStatusDb(
      invoiceId,
      status
    );

  }

}