import { Link, NavLink } from "react-router";
import useMetaArgs from "../../hooks/useMeta";
import {
  RiBillLine,
  RiCalendarScheduleLine,
  RiContactsBook2Line,
  RiFile2Line,
  RiFileTextLine,
  RiGroupLine,
  RiHeartLine,
  RiHeartPulseFill,
  RiNotification2Line,
  RiPieChart2Line,
  RiPieChartBoxLine,
  RiShieldKeyholeLine,
  RiTrademarkLine,
  RiUser5Line,
  RiUserHeartLine,
  RiUserLine,
} from "@remixicon/react";
import SuspenseUI from "../../components/SuspenseUI";

export default function Home() {
  useMetaArgs({
    title: "Home, Clinicare",
    description: "Wellcome to your clinicare",
    keywords: "Health, clinic, Hospital",
  });
  return (
    <>
      <main className="bg-[#e3ecff]">
        <div className="pt-58 md:pt-60  mx-auto min-h-115 items-center max-w-[700px] ">
          <h1 className="font-bold text-4xl md:text-5xl text-center">
            Welcome to <br />{" "}
            <span className="text-6xl md:text-7xl text-[#FF5703]">
              Clinicare
            </span>
          </h1>
          <p className="py-8 text-zinc-800 text-center px-5 md:px-15 lg:px-20">
            Manage your hospital operations, patient records, and more with our
            powerful hospital management system.
          </p>
          <div className="flex gap-4 justify-center items-center pb-10">
            <Link to="/account/signup">
              <button className="btn bg-[#2465FF] text-white">
                New Patient
              </button>
            </Link>
            <Link to="/account/signin">
              <button
                typeof="button"
                className="btn btn-outline border-[#2465FF] text-[#2465FF]"
              >
                Login to Clinicare
              </button>
            </Link>
          </div>

        <div className="mx-auto w-[82%] lg:w-[88%] ">
          <img
            className="h-full w-full rounded-xl lg:h-110"
            src="clinicare-hero.svg"
            alt="clinicare-hero-img"
          />
        </div>


        </div>
        </main>

        <div className="container mx-auto">
          <div>
            <div className="pt-20">
              <h1 className="text-xl md:text-2xl font-bold text-center">
                Key Features to Simplify Hospital Management
              </h1>
              <p className="text-center text-sm mt-3">
                Comprehensive tools designed to enhance efficiency, improve
                patient care, and streamline hospital operations
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-3 px-2 mt-8 gap-4 lg:gap-8">
            <div className="border rounded-sm p-6">
              <div className="bg-[#D5E2FF] rounded-4xl p-2 w-[35px]">
                <RiCalendarScheduleLine size={20} className="text-blue-500" />
              </div>
              <h1 className="pt-3">Appointment Scheduling</h1>
              <p className="text-sm pt-3">
                Let patients book and reschedule appointments easily online with
                real-time availability and automated confirmations
              </p>
            </div>
            <div className="border rounded-sm p-4">
              <div className="bg-[#FFD7FF] rounded-4xl p-2 w-[35px]">
                <RiUserHeartLine size={20} className="text-pink-500" />
              </div>
              <h1 className="pt-3">Doctor & Department Management</h1>
              <p className="text-sm pt-3">
                Manage staff availability, departmental organization, and
                resource allocation efficiently.
              </p>
            </div>
            <div className="border rounded-sm p-4">
              <div className="bg-[#FFD7FF] rounded-4xl p-2 w-[35px]">
                <RiUserHeartLine size={20} className="text-pink-500" />
              </div>
              <h1 className="pt-3">Analytics Dashboard</h1>
              <p className="text-sm pt-3">
                Get real-time insights into bookings, patients visits, revenue,
                and operational performance
              </p>
            </div>
            <div className="border rounded-sm p-4">
              <div className="bg-[#FFE2E2] rounded-4xl p-2 w-[35px]">
                <RiFile2Line size={20} className="text-red-500" />
              </div>
              <h1 className="pt-3">Billing & Invoicing</h1>
              <p className="text-sm pt-3">
                Get invoices, track payments, and integrate with insurance
                providers seamlessly.
              </p>
            </div>
            <div className="border rounded-sm p-4">
              <div className="bg-[#FFEFD2] rounded-4xl p-2 w-[35px]">
                <RiNotification2Line size={20} className="text-orange-500" />
              </div>
              <h1 className="pt-3">Automated Reminders</h1>
              <p className="text-sm pt-3">
                Send SMS and email alerts for appointments, follow-ups, and
                medication reminders automatically.
              </p>
            </div>
            <div className="border rounded-sm p-4">
              <div className="bg-[#EBD7FF] rounded-4xl p-2 w-[35px]">
                <RiFileTextLine size={20} className="text-purple-500" />
              </div>
              <h1 className="pt-3">Electronic Medical Records</h1>
              <p className="text-sm pt-3">
                Store, access and update patient records securely with
                comprehensive digital health documentation
              </p>
            </div>
          </div>




        {/*How it works section  */}
        <div className=" py-5 px-4 my-14">
          <div className="text-center pt-10">
            <h1 className="text-3xl font-bold text-[#130A5C]">How It Works </h1>
            <p className="m-4 text-sm md:text-xl text-black">
              Simple steps to transform your hospital management and improve
              patient experience
            </p>
          </div>
          <div
            className="grid grid-cols-12 gap-6 lg:gap-8 relative px-2 mt-8"
            id="#howitworks"
          >
            {/* <div className="hidden md:block absolute left-1/2 top-0 h-full w-px bg-gray-300 transform -translate-x-1/2 z-0"/> */}
            {/* doctor profile */}
            <div className="md:flex justify-center items-center gap-8 col-span-12 bg-white shadow-2xl lg:shadow-none p-2 md-p-0">
              <div className="max-w-xl ">
                <div className="bg-[#1055F8] rounded-full w-10 h-10 flex justify-center items-center">
                  <h1 className="font-bold text-white text-xl">1</h1>
                </div>
                <h2 className="text-xl font-semibold mb-2 mt-5">Sign Up and Set Up Your Hospital Profile</h2>
                <p className=" text-zinc-800">
                  Add departments, doctors, rooms, and schedules to create a
                  comprehensive hospital management system tailored to your
                  facility.
                </p>
              </div>
              {/* img div */}
              <div>
                <img src="appointment.jpg" alt="doctor img" className="w-90 "/>
              </div>
            </div>
            {/* online section*/}
            <div className="md:flex flex-row-reverse justify-center items-center gap-25 bg-white col-span-12 rounded-xl shadow-2xl lg:shadow-none p-2 md:p-0">
              <div className="max-w-xl">
                <div className="bg-[#1055F8] rounded-full w-10 h-10 flex justify-center items-center">
                  <h1 className="font-bold text-white text-xl">2</h1>
                </div>
                <h2 className="text-xl font-semibold mb-2 mt-5">Enable Online Booking</h2>
                <p>
                  Patients can view doctor availability and schedule
                  appointments online through an intuitive booking interface
                  available 24/7.
                </p>
              </div>
              {/* img div */}
              <div>
                <img src="doctor.jpg" alt="appointment1 img" className="w-90"/>
              </div>
            </div>
            {/* management section*/}
            <div className="md:flex justify-center items-center gap-8 col-span-12 bg-white rounded-xl shadow-2xl lg:shadow-none p-2 md:p-0">
            
              <div className="max-w-xl">
                <div className="bg-[#1055F8] rounded-full w-10 h-10 flex justify-center items-center">
                  <h1 className="font-bold text-white text-xl">3</h1>
                </div>
                <h2 className="text-xl font-semibold mb-2 mt-5">Manage Appointments And Record</h2>
                <p>
                  Hospital staff can efficiently manage patient queues, update
                  medical records, and send automated reminders from a
                  centralized dashboard.
                </p>
              </div>
              {/* img div */}
              <div>
                <img src="trackdata.jpg" alt="appointment img" className="w-90"/>
              </div>
            </div>
            {/* dashboard section*/}
            <div className="md:flex flex-row-reverse justify-center items-center gap-25 col-span-12 rounded-xl bg-white p-2 md:p-0 shadow-2xl lg:shadow-none">
             
              <div className="max-w-xl">
                <div className="bg-[#1055F8] rounded-full w-10 h-10 flex justify-center items-center">
                  <h1 className="font-bold text-white text-xl">4</h1>
                </div>
                <h2 className="text-xl font-semibold mb-2 mt-5">Track Everything In One Dashboard</h2>
                <p>
                  View comprehensive analytics including appointments, patient
                  data, revenue metrics, and performance insights to optimize
                  hospital operations.
                </p>
              </div>
              {/* img div */}
              <div>
                <img src="bookappoint.jpg" alt="trackdata img" className="w-90"/>
              </div>
            </div>
          </div>
        </div>


        </div>


        <div className="flex flex-col md:flex-row items-center text-center justify-center gap-10 md:gap-25 py-8 bg-[#044FFE] md:h-60 text-white">
          <div>
            <h1 className="font-bold text-2xl">100+</h1>
            <p>Hospitals</p>
          </div>
          <div>
            <h1 className="font-bold text-2xl">1000+</h1>
            <p>Healthcare</p>
            <p>Professionals</p>
          </div>
          <div>
            <h1 className="font-bold text-2xl">1M+</h1>
            <p>Patients Served</p>
          </div>
          <div>
            <h1 className="font-bold text-2xl">99.9%</h1>
            <p>System Uptime</p>
          </div>
        </div>
      
    </>
  );
}
