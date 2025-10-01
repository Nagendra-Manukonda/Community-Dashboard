"use client";

import React from "react";
import InvoiceForm from "@/components/CreateInvoiceForm";

export default function AddInvoicePage() {
  return <InvoiceForm onCancel={() => window.history.back()} />;
}
