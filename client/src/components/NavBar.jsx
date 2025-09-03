import { RiSearchLine } from "@remixicon/react";
import { getTimeBasedGreeting } from "../utils/constants";

export default function NavBar({ user }) {
  const greeting = getTimeBasedGreeting();
  return (
    <header className="hidden lg:block sticky top-2 right-0 z-30 left-[200px] bg-white/50 backdrop-blur supports-[backdrop-filter]:bg-white/60 border border-zinc-200 rounded-full mx-4">
      <nav className="container mx-auto px-4 flex items-center justify-between gap-160 bg-white py-5 rounded-full">
        <h1 className="text-lg font-bold text-foreground capitalize">
          {greeting}, {user?.fullname} !
        </h1>
        <div className="flex items-center justify-center gap-4">
          <div className="flex items-center justify-center border border-gray-400 p-2 gap-2 rounded-sm">
            <RiSearchLine size={20} className="text-gray-500" />
            <input
              type="search"
              className="border-none outline-0 text-sm"
              placeholder="Search..."
            />
          </div>
          <div className="avatar avatar-placeholder">
            <div className="w-10 rounded-full bg-gray-300 text-gray-600">
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
                    .join("")
                    .toUpperCase()}
                </span>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
