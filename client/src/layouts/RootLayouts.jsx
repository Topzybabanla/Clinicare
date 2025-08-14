import Logo from "@/components/Logo";
import { RiCopyrightFill } from "@remixicon/react";
import { NavLink, Outlet } from "react-router";

export default function RootLayouts() {
  return (
    <div className="relative">
      <div className="fixed top-0 left-0 right-0 z-50 bg-white container mx-auto py-5 px-4 flex justify-between items-center">
        <Logo />
        <div className="lg:flex gap-8 hidden ">
          <NavLink>Features</NavLink>
          <NavLink>How it Works</NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) => (isActive ? "text-blue-500 " : " ")}
          >
            Contact us
          </NavLink>
        </div>
        <NavLink
          to="/account/signup"
          className={({ isActive }) =>
            isActive
              ? "text-blue-500"
              : "text-[#FFFCFC] hover:text-blue-500 border border-blue-500 py-2 px-7 bg-[#2465FF] rounded"
          }
        >
          Get started
        </NavLink>
      </div>
      <Outlet />
      <div className="py-5 px-4 bg-[#0232A2] mt-50 text-white">
        {/* HR line in Css - Divider */}
        <div className="divider"></div>
        <div className="container mx-auto flex justify-center gap-1 md:justify-start text-center">
          <p>Copyright</p>
          <RiCopyrightFill size={18} />
          <span className="text-sm">
            {new Date().getFullYear()} Clinicare. All rights reserved.
          </span>
        </div>
      </div>
    </div>
  );
}
