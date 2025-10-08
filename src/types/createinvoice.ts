export interface Product {
  name: string;
  rate: string;
  qty: number;
  amount: string;
}

export interface Invoice {
  id: string;
  name: string;
  email: string;
  date: string;
  address: string;
  status: "Pending" | "Complete" | "Cancel";
  products: Product[];
}

export interface InvoiceFormProps {
  onCancel?: () => void;
}