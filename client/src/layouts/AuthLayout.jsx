import React from "react";
import { Outlet } from "react-router";
import Logo from "../components/Logo";
import { RiCopyrightFill } from "@remixicon/react";

export default function AuthLayout() {
  return (
    <div className="bg-[#e3ecff] top-0 left-0 right-0 z-50 container mx-auto py-5 px-4">
      <Logo />
      <Outlet />
      <div className="container mx-auto px-4">
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
