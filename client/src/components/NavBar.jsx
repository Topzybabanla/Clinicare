import { RiSearchLine } from "@remixicon/react";
import { getTimeBasedGreeting } from "../utils/constants";

export default function NavBar({ user }) {
  const greeting = getTimeBasedGreeting();
  return (
    <nav className="flex items-center justify-center gap-160 bg-white p-3 rounded-4xl">
      <div>
        <p className="text-sm">
          {greeting}, {user?.fullname} !{" "}
        </p>
      </div>
      <div className="flex items-center justify-center gap-4">
        <div className="flex items-center justify-center border border-gray-400 p-2 gap-2 rounded-sm">
          <RiSearchLine size={20} className="text-gray-500" />
          <input
            type="search"
            className="border-none outline-0 text-sm"
            placeholder="Search..."
          ></input>
        </div>
        <div className="avatar">
          <div className="rounded-full w-12">
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
    </nav>
  );
}
