import { Analytics } from "@/types/analytics";
import { Invoice } from "@/types/Invoice";
import { Contact } from "@/types/messages";
import { Schedule } from "@/types/schedule";
import { TaskType } from "@/types/settings";

export const defaultData: Analytics[] = [
  {
    id: "1",
    image: "/assets/image.svg",
    name: "John Deo",
    moblie: "+33757005467",
    email: "johndoe2211@gmail.com",
    gender: "Male",
  },
  {
    id: "2",
    image: "/assets/Group 466.svg",
    name: "Shelby Goode",
    moblie: "+33757005467",
    email: "shelbygoode481@gmail.com",
    gender: "Female",
  },
  {
    id: "3",
    image: "/assets/Group 469.svg",
    name: "Robert Bacins",
    moblie: "+33757005467",
    email: "robertbacins@gmail.com",
    gender: "Male",
  },
  {
    id: "4",
    image: "/assets/Group 472.svg",
    name: "John Carilo",
    moblie: "+33757805467",
    email: "john carilo182@.com",
    gender: "Male",
  },
  {
    id: "5",
    image: "/assets/Group 475.svg",
    name: "Adriene Watson",
    moblie: "+83757305467",
    email: "adrienewatson82@.com",
    gender: "Female",
  },
  {
    id: "6",
    image: "/assets/Group 478.svg",
    name: "Jhon Deo",
    moblie: "+63475700546",
    email: "jhondeo24823@.com",
    gender: "Male",
  },
  {
    id: "7",
    image: "/assets/Group 481.svg",
    name: "Mark Ruffalo",
    moblie: "+33757005467",
    email: "markruffalo3735@.com",
    gender: "Male",
  },
  {
    id: "8",
    image: "/assets/Group 484.svg",
    name: "Bethany jackson",
    moblie: "+33757005467",
    email: "bethanyjackson@gmail.com",
    gender: "Female",
  },
  {
    id: "9",
    image: "/assets/Group 487.svg",
    name: "Christine Huston",
    moblie: "+33757005467",
    email: "christinehuston4@.com",
    gender: "Male",
  },
  {
    id: "10",
    image: "/assets/Group 490.svg",
    name: "Anne Jacob",
    moblie: "+33757005467",
    email: "annejacob2@ummoh.com",
    gender: "Male",
  },
  {
    id: "11",
    image: "/assets/img & bg.svg",
    name: "James Mullican",
    moblie: "+33757005467",
    email: "jamesmullican5346@.com",
    gender: "Male",
  },
];


export const events: Record<string, { label: string; color: string }[]> = {
  "2025-01-26": [{ label: "Republic Day", color: "bg-orange-400 text-white" }],
  "2025-03-14": [{ label: "Holi", color: "bg-pink-400 text-white" }],
  "2025-02-26": [{ label: "Maha Shivratri", color: "bg-purple-400 text-white" }],
  "2025-08-15": [{ label: "Independence Day", color: "bg-green-400 text-white" }],
  "2025-09-13": [{ label: "Birthday", color: "bg-green-700 text-white" }],
  "2025-08-27": [{ label: "Krishna Janmashtami", color: "bg-blue-400 text-white" }],
  "2025-08-29": [{ label: "Vinayaka Chavithi", color: "bg-yellow-400 text-white" }],
  "2025-10-02": [{ label: "Gandhi Jayanti", color: "bg-green-400 text-white" }],
  "2025-10-03": [{ label: "Durga Ashtami", color: "bg-red-400 text-white" }],
  "2025-10-12": [{ label: "Dussehra", color: "bg-orange-400 text-white" }],
  "2025-10-20": [{ label: "Karwa Chauth", color: "bg-pink-400 text-white" }],
  "2025-10-21": [{ label: "Diwali", color: "bg-yellow-400 text-white" }],
  "2025-12-25": [{ label: "Christmas", color: "bg-green-400 text-white" }],
};

export const AnalyticsChartdata = [
  { name: "Sale", value: 35.15, color: "#5B93FF" },
  { name: "Distribute", value: 20.07, color: "#FFD66B" },
  { name: "Return", value: 25.76, color: "#FF8F6B" },
  { name: "Empty", value: 20, color: "transparent" },
];

export const Bannerdata = [
  { icon: "/assets/Heart.svg", title: "178+", desc: "Save Products" },
  { icon: "/assets/Game.svg", title: "20+", desc: "Stock Products" },
  { icon: "/assets/Bag.svg", title: "190+", desc: "Sales Products" },
  { icon: "/assets/Work.svg", title: "12+", desc: "Job Application" },
];


export const invoiceDefaultData: Invoice[] = [
  {
    id: "#876364",
    image: "/assets/Group 465.svg",
    name: "Arrora gaur",
    email: "arroragaur@gmail.com",
    date: "12 Dec, 2020",
    status: "Complete",
  },
  {
    id: "#876123",
    image: "/assets/Group 466.svg",
    name: "James Mullican",
    email: "jamesmullican@gmail.com",
    date: "10 Dec, 2020",
    status: "Pending",
  },
  {
    id: "#876213",
    image: "/assets/Group 469.svg",
    name: "Robert Bacins",
    email: "robertbacins@gmail.com",
    date: "09 Dec, 2020",
    status: "Complete",
  },
  {
    id: "#876987",
    image: "/assets/Group 472.svg",
    name: "Bethany Jackson",
    email: "bethanyjackson@gmail.com",
    date: "09 Dec, 2020",
    status: "Cancel",
  },
  {
    id: "#871345",
    image: "/assets/Group 475.svg",
    name: "Anne Jacob",
    email: "annejacob@gmail.com",
    date: "10 Dec, 2020",
    status: "Complete",
  },
  {
    id: "#872345",
    image: "/assets/Group 478.svg",
    name: "Bethany jackson",
    email: "bethanyjackson@gmail.com",
    date: "10 Dec, 2020",
    status: "Pending",
  },
  {
    id: "#872346",
    image: "/assets/Group 481.svg",
    name: "James Mullican",
    email: "jamesmullican@gmail.com",
    date: "10 Dec, 2020",
    status: "Complete",
  },
  {
    id: "#873245",
    image: "/assets/Group 484.svg",
    name: "Jhon Deo",
    email: "jhondeo@gmail.com",
    date: "08 Dec, 2020",
    status: "Complete",
  },
  {
    id: "#876364",
    name: "Bethany jackson",
    image: "/assets/Group 487.svg",
    email: "bethanyjackson@gmail.com",
    date: "02 Dec, 2020",
    status: "Cancel",
  },
  {
    id: "#878769",
    image: "/assets/Group 490.svg",
    name: "James Mullican",
    email: "jamesmullican@gmail.com",
    date: "01 Dec, 2020",
    status: "Pending",
  },
];


export const contacts: Contact[] = [
  {
    id: "1",
    name: "Shelby Goode",
    time: "1 min ago",
    last: "Lorem Ipsum is simply dummy text of the printing",
    image: "/assets/Ellipse 64.svg",
    online: true,
  },
  {
    id: "2",
    name: "Robert Bacins",
    time: "9 min ago",
    last: "Lorem Ipsum is simply dummy text of the printing",
    image: "/assets/Ellipse 64 (1).svg",
    online: false,
  },
  {
    id: "3",
    name: "John Carilo",
    time: "15 min ago",
    last: "Lorem Ipsum is simply dummy text of the printing",
    image: "/assets/Ellipse 92.svg",
    online: true,
  },
  {
    id: "4",
    name: "Adriene Watson",
    time: "21 min ago",
    last: "Lorem Ipsum is simply dummy text of the printing",
    image: "/assets/Ellipse 92 (1).svg",
    online: true,
  },
  {
    id: "5",
    name: "Jhon Deo",
    time: "29 min ago",
    last: "Lorem Ipsum is simply dummy text of the printing",
    image: "/assets/Ellipse 92 (2).svg",
    online: true,
  },
  {
    id: "6",
    name: "Mark Ruffalo",
    time: "45 min ago",
    last: "Lorem Ipsum is simply dummy text of the printing",
    image: "/assets/Ellipse 92 (3).svg",
    online: true,
  },
  {
    id: "7",
    name: "Bethany Jackson",
    time: "1h ago",
    last: "Lorem Ipsum is simply dummy text of the printing",
    image: "/assets/Ellipse 92 (4).svg",
    online: true,
  },
];

export const colors = [
  "rgba(91, 147, 255, 0.3)",
  "rgba(255, 182, 193, 0.3)",
  "rgba(255, 107, 107, 0.3)",
];

export const initialMessages = [
  {
    id: "m1",
    text: "Lorem Ipsum is simply dummy text of the printing",
    time: "09:02 PM",
  },
  {
    id: "m2",
    fromMe: true,
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    time: "09:02 PM",
  },
  {
    id: "m3",
    text: "",
    time: "09:03 PM",
    image: "/assets/Rectangle 170.svg",
  },
  {
    id: "m4",
    fromMe: true,
    text: "",
    time: "09:04 PM",
    image: "/assets/Rectangle 171.svg",
  },
  {
    id: "m5",
    fromMe: true,
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    time: "09:04 PM",
  },
];

export const orders = [
  {
    trackingNo: "#876264",
    productName: "Camera Lens",
    productImage: "/assets/Rectangle 91.svg",
    price: "$178",
    totalOrder: 325,
    totalAmount: "$1,46,660",
  },
  {
    trackingNo: "#876368",
    productName: "Black Sleep Dress",
    productImage: "/assets/Rectangle 90.svg",
    price: "$14",
    totalOrder: 53,
    totalAmount: "$46,660",
  },
  {
    trackingNo: "#876412",
    productName: "Argan Oil",
    productImage: "/assets/Rectangle 111.svg",
    price: "$21",
    totalOrder: 78,
    totalAmount: "$3,46,676",
  },
  {
    trackingNo: "#876621",
    productName: "EAU DE Parfum",
    productImage: "/assets/Rectangle 110.svg",
    price: "$32",
    totalOrder: 98,
    totalAmount: "$3,46,981",
  },
];


export const Salesdata = [
  { time: "10am", value: 55, sales: 2400 },
  { time: "11am", value: 30, sales: 1800 },
  { time: "12pm", value: 60, sales: 2000 },
  { time: "01pm", value: 37, sales: 2200 },
  { time: "02am", value: 22, sales: 1500 },
  { time: "03am", value: 50, sales: 2678 },
  { time: "04am", value: 15, sales: 1200 },
  { time: "05am", value: 30, sales: 1800 },
  { time: "06am", value: 65, sales: 3000 },
  { time: "07am", value: 58, sales: 3100 },
  { time: "08am", value: 75, sales: 3313 },
];

export const scheduleData: Schedule[] = [
  { date: "12 Dec, 2021", time: "10.15AM", location: "Office Meeting" },
  { date: "10 Dec, 2021", time: "11.20AM", location: "Home" },
  { date: "09 Dec, 2021", time: "11.45AM", location: "Friends Zone" },
  { date: "08 Dec, 2021", time: "12.15PM", location: "Office Meeting" },
  { date: "07 Dec, 2021", time: "01.20PM", location: "Home" },
  { date: "05 Dec, 2021", time: "10.15AM", location: "Meeting Outside" },
  { date: "04 Dec, 2021", time: "11.15AM", location: "Office Meeting" },
  { date: "04 Dec, 2021", time: "01.25PM", location: "Home" },
  { date: "02 Dec, 2021", time: "10.15AM", location: "Friends" },
  { date: "01 Dec, 2021", time: "04.30PM", location: "Meeting Outside" },
];

export const tasksByDate: Record<string, TaskType[]> = {
  [new Date().toDateString()]: [
    {
      time: 9,
      label: "Graphic Design",
      color: "bg-white border",
      priority: "Low",
    },
    {
      time: 11,
      label: "Dashboard Design",
      color: "bg-white border",
      priority: "High",
    },
    {
      time: 13,
      label: "Logo Design",
      color: "bg-white border",
      priority: "High",
    },
    {
      time: 16,
      label: "Web Design",
      color: "bg-white border",
      priority: "High",
    },
  ],
};

export const products = [
  {
    id: 1,
    name: "NIKE Shoes Black Pattern",
    price: "$87",
    image: "/assets/Rectangle 53.svg",
    rating: 4,
  },
  {
    id: 2,
    name: "iPhone 12",
    price: "$987",
    image: "/assets/iPhone-12-2-removebg-preview 1.svg",
    rating: 4,
  },
];