import {
  RiCalendarScheduleLine,
  RiDashboardLine,
  RiHotelBedLine,
  RiBankCardLine,
  RiStethoscopeLine,
  RiGroupLine,
  RiGroup3Line,
  RiUserLine,
  RiSettingsLine,
  RiCalendarLine,
} from "@remixicon/react";
import dayjs from "dayjs";

export const navLinks = [
  {
    title: "Menu",
    links: [
      { id: 1, label: "Dashboard", to: "/dashboard", Icon: RiDashboardLine },
      {
        id: 2,
        label: "Appointments",
        to: "/dashboard/appointments",
        Icon: RiCalendarScheduleLine,
      },
      { id: 3, label: "Rooms", to: "/dashboard/rooms", Icon: RiHotelBedLine },
      {
        id: 4,
        label: "Payments",
        to: "/dashboard/payments",
        Icon: RiBankCardLine,
      },
      {
        id: 10,
        label: "Appointments",
        to: "/dashboard/patient-appointments",
        Icon: RiCalendarLine,
      },
      {
        id: 11,
        label: "Payments",
        to: "/dashboard/patient-payments",
        Icon: RiCalendarLine,
      },
    ],
  },
  {
    title: "Management",
    links: [
      {
        id: 5,
        label: "Doctors",
        to: "/dashboard/doctors",
        Icon: RiStethoscopeLine,
      },
      {
        id: 6,
        label: "Patients",
        to: "/dashboard/patients",
        Icon: RiGroupLine,
      },
      {
        id: 7,
        label: "InPatients",
        to: "/dashboard/inpatients",
        Icon: RiGroup3Line,
      },
    ],
  },
  {
    title: "Settings",
    links: [
      { id: 8, label: "Users", to: "/dashboard/users", Icon: RiUserLine },
      {
        id: 9,
        label: "Settings",
        to: "/dashboard/settings",
        Icon: RiSettingsLine,
      },
    ],
  },
];

export const bloodGroup = {
  "A+": "A-positive",
  "A-": "A-negative",
  "B+": "B-positive",
  "B-": "B-negative",
  "AB+": "AB-positive",
  "AB-": "AB-negative",
  "O+": "O-positive",
  "O-": "O-negative",
};

export const headers = (accessToken) => {
  return {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
};

export const getTimeBasedGreeting = () => {
  const hour = new Date().getHours();

  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
};

export const formatDate = (item, format = "display") => {
  if (format === "input") {
    return dayjs(item).format("YYYY-MM-DD");
  }
  return dayjs(item).format("DD/MM/YYYY");
};

export const settingsLink = [
  {
    id: "account",
    href: "/dashboard/settings/account",
    name: "Account",
  },
  {
    id: "password",
    href: "/dashboard/settings/password",
    name: "Password",
  },
  {
    id: "health",
    href: "/dashboard/settings/health",
    name: "Health Record",
  },
];

export const dummyData = [
  {
    _id: 1,
    avatar:
      "https://images.unsplash.com/photo-1594026724063-fcf520d86e23?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0Mnx8fGVufDB8fHx8fA%3D%3D",
    name: "Sussana",
    email: "sussanobi1999@gmail.com",
    role: "Patient",
    phone: "09065435780",
    joined: "22/07/2025",
  },
  {
    _id: 2,
    name: "Joseph Gift",
    email: "jgifted13@gmail.com",
    role: "Patient",
    phone: "N/A",
    joined: "21/07/2025",
    avatar: "",
  },
  {
    _id: 3,
    name: "Eric Fullstack",
    email: "cobimbachu@gmail.com",
    role: "Patient",
    phone: "0123456789",
    joined: "11/07/2025",
    avatar: "",
  },
  {
    _id: 4,
    name: "Mubarak Tech",
    email: "charlesmutob@gmail.com",
    role: "Doctor",
    phone: "N/A",
    joined: "11/07/2025",
    avatar: "",
  },
  {
    _id: 5,
    name: "Dizzy Gilepsy",
    email: "ceenobi@icloud.com",
    role: "Admin",
    phone: "09061987800",
    joined: "20/06/2025",
    avatar: "",
  },
];

export const usersRoleColors = {
  admin: "bg-blue-200 text-blue-700",
  doctor: "bg-green-200 text-green-700",
  nurse: "bg-yellow-200 text-yellow-700",
  staff: "bg-teal-200 text-teal-700",
  patient: "bg-red-200 text-red-700",
};

export const roles = ["admin", "staff", "doctor", "nurse", "patient"];

export const roleBasedPathPermissions = {
  admin: {
    allowedSubpaths: [
      "/dashboard",
      "/dashboard/appointments",
      "/dashboard/rooms",
      "/dashboard/payments",
      "/dashboard/doctors",
      "/dashboard/patients",
      "/dashboard/inpatients",
      "/dashboard/users",
      "/dashboard/settings",
      "/dashboard/settings/account",
      "/dashboard/settings/password",
    ],
  },
  doctor: {
    allowedSubpaths: [
      "/dashboard",
      "/dashboard/appointments",
      "/dashboard/rooms",
      "/dashboard/doctors",
      "/dashboard/patients",
      "/dashboard/inpatients",
      "/dashboard/settings",
      "/dashboard/settings/account",
      "/dashboard/settings/password",
    ],
  },
  patient: {
    allowedSubpaths: [
      "/dashboard",
      "/dashboard/patient-appointments",
      "/dashboard/patient-payments",
      "/dashboard/settings",
      "/dashboard/settings/account",
      "/dashboard/settings/password",
      "/dashboard/settings/health",
    ],
  },
  nurse: {
    allowedSubpaths: [
      "/dashboard",
      "/dashboard/appointments",
      "/dashboard/rooms",
      "/dashboard/settings",
      "/dashboard/settings/account",
      "/dashboard/settings/password",
    ],
  },
  staff: {
    allowedSubpaths: [
      "/dashboard",
      "/dashboard/appointments",
      "/dashboard/rooms",
      "/dashboard/settings",
      "/dashboard/settings/account",
      "/dashboard/settings/password",
    ],
  },
};

export const patientsTableColumns = [
  { name: "NAME", uid: "fullname" },
  { name: "GENDER", uid: "gender" },
  { name: "DATE OF BIRTH", uid: "dateOfBirth" },
  { name: "ADDRESS", uid: "address" },
  { name: "BLOOD GROUP", uid: "bloodGroup" },
  { name: "PHONE", uid: "phone" },
  { name: "ACTION", uid: "action" },
];

export const roomsTableColumns = [
  { name: "ROOM NUMBER", uid: "roomNumber" },
  { name: "ROOM TYPE", uid: "roomType" },
  { name: "ROOM CAPACITY", uid: "roomCapacity" },
  { name: "ROOM PRICE", uid: "roomPrice" },
  { name: "ROOM STATUS", uid: "roomStatus" },
  { name: "IS FILLED", uid: "isFilled" },
  { name: "ACTION", uid: "action" },
];

export const roomsStatusColors = {
  available: "bg-green-200 text-green-700",
  occupied: "bg-yellow-200 text-yellow-700",
  maintenance: "bg-red-200 text-red-700",
};

export const formatCurrency = (amount, currency = "NGN") => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: currency || "NGN",
  }).format(amount);
};

export const doctorsTableColumns = [
  { name: "DOCTOR NAME", uid: "fullname" },
  { name: "PHONE", uid: "phone" },
  { name: "SPECIALIZATION", uid: "specialization" },
  { name: "STATUS", uid: "availability" },
  { name: "ACTION", uid: "action" },
];

export const doctorsStatusColors = {
  available: "bg-green-200 text-green-700",
  unavailable: "bg-blue-200 text-blue-700",
  "on leave": "bg-yellow-200 text-yellow-700",
  sick: "bg-red-200 text-red-700",
};

export const patientsAppointmentsTableColumns = [
  { name: "APPOINTMENT ID", uid: "appointmentId" },
  { name: "DATE", uid: "appointmentDate" },
  { name: "DOCTOR", uid: "doctor" },
  { name: "TIME", uid: "appointmentTime" },
  { name: "STATUS", uid: "status" },
  { name: "ACTION", uid: "action" },
];

export const appointmentsStatusColors = {
  scheduled: "bg-yellow-200 text-yellow-700",
  confirmed: "bg-green-200 text-green-700",
  cancelled: "bg-red-200 text-red-700",
};

export const appointmentTime = ["10:00 AM", "1:00 PM", "3:00 PM"];

export const appointmentsTableColumns = [
  { name: "APPOINTMENT ID", uid: "appointmentId" },
  { name: "PATIENT", uid: "patientName" },
  { name: "DOCTOR", uid: "doctor" },
  { name: "DATE", uid: "appointmentDate" },
  { name: "TIME", uid: "appointmentTime" },
  { name: "STATUS", uid: "status" },
  { name: "ACTION", uid: "action" },
];

export const paymentsTableColumns = [
  { name: "PATIENT", uid: "patientName" },
  { name: "PAYMENT ID", uid: "paymentId" },
  { name: "PAYMENT TYPE", uid: "paymentType" },
  { name: "AMOUNT", uid: "amount" },
  { name: "STATUS", uid: "status" },
  { name: "PAID AT", uid: "paidAt" },
  { name: "ACTION", uid: "action" },
];

export const paymentStatusColors = {
  pending: "bg-yellow-200 text-yellow-700",
  confirmed: "bg-green-200 text-green-700",
  cancelled: "bg-red-200 text-red-700",
};

export const inpatientsTableColumns = [
  { name: "PATIENT", uid: "patientName" },
  { name: "DOCTOR", uid: "doctorName" },
  { name: "ROOM", uid: "room" },
  { name: "ADMISSION DATE", uid: "admissionDate" },
  { name: "DISCHARGE DATE", uid: "dischargeDate" },
  { name: "STATUS", uid: "status" },
  { name: "ACTION", uid: "action" },
];

export const inpatientStatusColors = {
  admitted: "bg-green-200 text-green-700",
  discharged: "bg-red-200 text-red-700",
  transferred: "bg-yellow-200 text-yellow-700",
};
