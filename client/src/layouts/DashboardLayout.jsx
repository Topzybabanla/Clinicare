import Logo from "@/components/Logo";
import { RiLogoutCircleRLine } from "@remixicon/react";
import NavBar from "@/components/NavBar";
import { NavLink, Outlet } from "react-router";
import SideBar from "@/components/SideBar";
import { useAuth } from "../store";

export default function DashBoardLayout() {
  const { user } = useAuth();

  return (
    <div className="hidden lg:block backdrop-blur supports-[backdrop-filter] bg-slate-100 min-h-[100vh] fixed min-w-[100vw]">
      <div className=" fixed top-0 left-0 right-0 z-50">
        <div className="container mx-auto py-2 px- flex justify-between items-center  ">
          <Logo />
          <NavBar user={user}/>
        </div>
      </div>

      <SideBar />
      <Outlet />
      <div className="container mx-auto py-5 px-4">
        {/* hr line css -divider */}
        <NavLink
          className="flex justify-center md:justify-start gap-2"
          to="/signin"
        >
          <RiLogoutCircleRLine size={20} className="text-red-500" />
          <span className="text-red-500">Logout</span>
        </NavLink>
      </div>
    </div>
  );
}
