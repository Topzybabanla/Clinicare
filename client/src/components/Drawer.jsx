// import { useAuth } from "@/store";
import { RiCloseLine, RiLogoutCircleRLine, RiMenuLine } from "@remixicon/react";
import { useState } from "react";
import Sidebar from "./SideBar";
import { NavLink } from "react-router";
import Logout from "./Logout";
import { navLinks } from "../utils/constants";
// import { useAuth } from "@/store";

export default function Drawer({ user }) {
  const [open, setOpen] = useState(false);
  const toggleDrawer = () => setOpen(!open);
  // const user = useAuth();

  return (
    <div>
      <button onClick={toggleDrawer}>
        <RiMenuLine />
      </button>
      <div
        className={`fixed top-0 left-0 z- h-full w-full bg-white shadow-lg transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ pointerEvents: open ? "auto" : "no" }}
      >
        <button
          className="absolute top-6 right-4 textblack"
          onClick={toggleDrawer}
        >
          <RiCloseLine />
        </button>
        <div className="px-4 py-5 w-full h-full overflow-y-auto">
          <div className="flex gap-2 items-center">
            <div className="flex gap-2 items-center">
              <div className="avatar avatar-placeholder">
                <div className="w-10 rounded-full bg-gray-300 text-gray-600 border-2 border-gray-300">
                  {user?.avatar ? (
                    <img
                      src={user?.avatar}
                      alt={user?.fullname.split(" ")[0].charAt(0)}
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      priority="high"
                    />
                  ) : (
                    <span className="text-sm">
                      {user?.fullname
                        ?.split(" ")
                        .map((name) => name[0])
                        .join(" ")
                        .toUpperCase()}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div>
              <h1 className="font-bold text-lg">{user?.fullname}</h1>
              <p className="text-gray-500">{user?.role}</p>
            </div>
          </div>

          {open && <Sidebar />}
          <div className="overflow-y-auto h-[calc(100vh-150px)] space-y-2">
            {navLinks.map((section) => (
              <div key={section.title}>
                <p className="text-xs font-semi-bold text-gray-500 my-2">
                  {section.title}
                </p>
                <div className="">
                  {section.links.map((link) =>
                    // Highlighted update: Only dashboard link gets 'end' prop
                    link.to === "/dashboard" ? (
                      <NavLink
                        key={link.id}
                        to={link.to}
                        end
                        onClick={() => setOpen(false)}
                        className={({ isActive }) =>
                          `${
                            isActive
                              ? "text-blue-500 font-bold bg-blue-100  rounded-full"
                              : ""
                          } p-1.5 flex items-center gap-2 hover:text-blue-500 transition-all duration-300`
                        }
                      >
                        <link.Icon className="h-5 w-5" />
                        <span>{link.label}</span>
                      </NavLink>
                    ) : (
                      <NavLink
                        key={link.id}
                        to={link.to}
                        onClick={() => setOpen(false)}
                        className={({ isActive }) =>
                          `${
                            isActive
                              ? "text-blue-500 font-bold bg-blue-100  rounded-full"
                              : ""
                          } p-1.5 flex items-center gap-2 hover:text-blue-500 transition-all duration-300`
                        }
                      >
                        <link.Icon className="h-5 w-5" />
                        <span>{link.label}</span>
                      </NavLink>
                    )
                  )}
                </div>
              </div>
            ))}
          </div>
          <Logout />
        </div>
      </div>
    </div>
  );
}
