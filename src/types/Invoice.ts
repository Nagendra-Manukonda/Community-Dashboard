export interface Invoice {
  id: string;
  name: string;
  image: string;
  email: string;
  date: string;
  status: "Complete" | "Pending" | "Cancel";
}