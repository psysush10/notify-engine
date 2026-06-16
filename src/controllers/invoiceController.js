import {

 generateInvoice,
 getInvoices,
 markInvoicePaid

}
from "../services/invoiceService.js";

export const generateInvoiceApi = async (
 req,
 res
) => {

 try {

   const invoice =
     await generateInvoice(
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

export const getInvoicesApi = async (
 req,
 res
) => {

 try {

   const invoices =
     await getInvoices(
       req.tenantId
     );

   res.json(
     invoices
   );

 } catch (error) {

   res.status(500).json({

     error:
       error.message

   });

 }

};

export const markInvoicePaidApi = async (
  req,
  res
) => {

  try {

    const {
      id
    } = req.params;

    const invoice =
      await markInvoicePaid(
        id
      );

    if (!invoice) {

      return res
        .status(404)
        .json({

          error:
            "Invoice not found"

        });

    }

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
