import React from "react";
import Logo from "../components/Logo";
import { NavLink, Outlet } from "react-router";
import { RiCopyrightFill } from "@remixicon/react";
import Logout from "../components/Logout";

export default function OnboardingLayout() {
  return (
    <div className="relative bg-slate-100">
      <div className="fixed top-0 left-0 right-0 z-50  container mx-auto py-5 px-4 flex justify-between items-center">
        <Logo />
        <Logout/>
       {/* <button className="btn btn-soft bg-red-600 text-white hover:cursor-pointer hover:bg-red-400">Logout</button> */}
      </div>
      <Outlet />
      <div className="container mx-auto py-5 px-4">
        {/* HR line in Css - Divider */}
        <div className="divider"></div>
        <div className="flex">
          <RiCopyrightFill size={18} />
          <span className="text-sm">
            {new Date().getFullYear()} Clinicare. All rights reserved.
          </span>
        </div>
      </div>
    </div>
  );
}
