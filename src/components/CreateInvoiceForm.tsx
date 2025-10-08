"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MapPin, Trash, ChevronDown, FileText, Plus } from "lucide-react";
import { Product, Invoice, InvoiceFormProps } from "@/types/createinvoice";

const InvoiceForm: React.FC<InvoiceFormProps> = () => {
  const [invoice, setInvoice] = useState<Invoice>({
    id: "",
    name: "",
    email: "",
    date: "",
    address: "",
    status: "Pending",
    products: [{ name: "", rate: "$0", qty: 0, amount: "$0" }],
  });

  const [selectedView, setSelectedView] = useState<
    "Send Invoice" | "Create Invoice"
  >("Create Invoice");

  const [pdfFile, setPdfFile] = useState<string | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileURL = URL.createObjectURL(file);
      setPdfFile(fileURL);
    }
  };

  const handleProductChange = (
    index: number,
    field: keyof Product,
    value: string
  ) => {
    const updatedProducts = [...invoice.products];

    if (field === "qty") {
      const qty = parseInt(value) || 0;
      updatedProducts[index].qty = qty;
      const rate = parseFloat(
        updatedProducts[index].rate.replace("$", "") || "0"
      );
      updatedProducts[index].amount = `$${(qty * rate).toFixed(2)}`;
    } else if (field === "rate") {
      const rate = parseFloat(value.replace("$", "") || "0");
      updatedProducts[index].rate = `$${rate}`;
      const qty = updatedProducts[index].qty || 0;
      updatedProducts[index].amount = `$${(qty * rate).toFixed(2)}`;
    } else {
      updatedProducts[index][field] = value;
    }

    setInvoice({ ...invoice, products: updatedProducts });
  };

  const addProduct = () => {
    setInvoice({
      ...invoice,
      products: [
        ...invoice.products,
        { name: "", rate: "$0", qty: 0, amount: "$0" },
      ],
    });
  };

  const removeProduct = (index: number) => {
    const updatedProducts = invoice.products.filter((_, i) => i !== index);
    setInvoice({ ...invoice, products: updatedProducts });
  };

  const calculateTotal = () => {
    return invoice.products.reduce((total, product) => {
      const amt = parseFloat(product.amount.replace("$", "") || "0");
      return total + (isNaN(amt) ? 0 : amt);
    }, 0);
  };

  const formatQty = (value: number) => (value ? `${value}` : "0");

  return (
    <div className={`flex gap-6 w-full ${pdfFile ? "" : "justify-center"}`}>
      <div
        className={`p-6 border rounded-lg shadow-lg space-y-6 ${
          pdfFile ? "w-1/2" : "w-full"
        }`}
      >
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold">Create New Invoice</h2>

          <div>
            <Input
              type="file"
              accept="application/pdf"
              onChange={handleFileUpload}
              className="hidden bg-white"
              id="upload-pdf"
            />
            <label
              htmlFor="upload-pdf"
              className="flex items-center gap-2 bg-blue-500 text-white h-10 px-4 rounded cursor-pointer"
            >
              <FileText className="w-4 h-4" /> Upload PDF
            </label>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block font-semibold">Invoice Id</label>
            <Input
              value={invoice.id}
              onChange={(e) => setInvoice({ ...invoice, id: e.target.value })}
              placeholder="#876370"
              className="w-full h-[50px] mt-1"
            />
          </div>
          <div className="flex-1">
            <label className="block font-semibold">Date</label>
            <Input
              type="date"
              value={invoice.date}
              onChange={(e) => setInvoice({ ...invoice, date: e.target.value })}
              className="w-full h-[50px] mt-1"
            />
          </div>
        </div>

        <div>
          <label className="block font-semibold">Name</label>
          <Input
            value={invoice.name}
            onChange={(e) => setInvoice({ ...invoice, name: e.target.value })}
            placeholder="Alison G."
            className="w-full h-[50px] mt-1"
          />
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block font-semibold">Email</label>
            <Input
              type="email"
              value={invoice.email}
              onChange={(e) =>
                setInvoice({ ...invoice, email: e.target.value })
              }
              placeholder="example@gmail.com"
              className="w-full h-[50px] mt-1"
            />
          </div>
          <div className="flex-1 relative">
            <label className="block font-semibold">Address</label>
            <Input
              value={invoice.address}
              onChange={(e) =>
                setInvoice({ ...invoice, address: e.target.value })
              }
              placeholder="Street"
              className="w-full h-[50px] mt-1"
            />
            <MapPin className="absolute top-10 right-2 text-gray-400" />
          </div>
        </div>

        <div className="flex justify-between items-center mb-3">
          <h1 className="font-semibold text-[16px] text-[#030229]">
            Product Description
          </h1>
          <Button className="bg-[#605BFF]" onClick={addProduct}>
            <Plus />
          </Button>
        </div>

        <div className="flex items-center gap-4 font-semibold  mb-2">
          <div className="w-1/3 flex items-center gap-1">
            Product Name{" "}
            <ChevronDown className="w-6 h-6 fill-[#030229]/40 text-[#030229]/5" />
          </div>
          <div className="w-1/4 flex items-center gap-1">
            Rate{" "}
            <ChevronDown className="w-6 h-6 fill-[#030229]/40 text-[#030229]/5" />
          </div>
          <div className="w-1/4 flex items-center gap-1">
            5 QTY{" "}
            <ChevronDown className="w-6 h-6 fill-[#030229]/40 text-[#030229]/5" />
          </div>
          <div className="w-1/4 flex items-center gap-1">
            Amount{" "}
            <ChevronDown className="w-6 h-6 fill-[#030229]/40 text-[#030229]/5" />
          </div>
        </div>

        {invoice.products.map((product, index) => (
          <div key={index} className="flex items-center gap-4 mb-3">
            <Input
              value={product.name}
              placeholder="Product Name"
              onChange={(e) =>
                handleProductChange(index, "name", e.target.value)
              }
              className="w-1/3 text-[#0068DD] h-[50px]"
            />
            <Input
              value={product.rate}
              placeholder="Rate"
              onChange={(e) => {
                let value = e.target.value;

                value = value.replace(/[^0-9.]/g, "");

                if (value.length > 13) {
                  value = value.slice(0, 13);
                }

                handleProductChange(index, "rate", value);
              }}
              className="w-1/4 text-[#030229] h-[50px]"
            />

            <Input
              value={formatQty(product.qty)}
              placeholder="Quantity"
              onChange={(e) =>
                handleProductChange(index, "qty", e.target.value)
              }
              className="w-1/4 h-[50px]"
            />
            <Input
              value={product.amount || "$0.00"}
              placeholder="Amount"
              readOnly
              className="w-1/4 h-[50px] text-[#2B9943] bg-gray-50"
            />
            <Button
              onClick={() => removeProduct(index)}
              className="text-red-600"
            >
              <Trash className="w-4 h-4 fill-[#E71D36]" />
            </Button>
          </div>
        ))}

        <div className="mt-4 font-semibold text-right">
          Total: ${calculateTotal().toFixed(2)}
        </div>

        <div className="flex justify-center items-center mt-10 gap-3 ">
          {["Send Invoice", "Create Invoice"].map((view, index) => (
            <Button
              key={view}
              className={`h-11 font-semibold border border-[#030229]/20 text-xs ${
                index === 0 ? "w-1/2 h-11" : "w-1/2 h-11"
              } ${
                selectedView === view
                  ? "bg-[#605BFF] text-white"
                  : "text-[#030229] hover:bg-[#605BFF] hover:text-white"
              }`}
              onClick={() =>
                setSelectedView(view as "Send Invoice" | "Create Invoice")
              }
            >
              {view}
            </Button>
          ))}
        </div>
      </div>

      {pdfFile && (
        <div className="w-1/2 border rounded-lg shadow-lg p-4">
          <iframe
            src={pdfFile}
            className="w-full bg-white h-[700px] rounded-lg"
            title="PDF Preview"
          />
        </div>
      )}
    </div>
  );
};

export default InvoiceForm;
