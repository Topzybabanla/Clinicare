import NavBar from "@/components/NavBar";
import { Outlet } from "react-router";
import SideBar from "@/components/SideBar";
import { useAuth } from "../store";
import MobileNav from "../components/MobileNav";


export default function DashBoardLayout() {
  const { user } = useAuth();

  return (
    <>
      <div className="min-h-screen bg-slate-100">
        <SideBar user={user}/>
        <div className="lg:ml-[200px] flex-1">
          <NavBar user={user} />
          <MobileNav/>
          <Outlet />
        </div>
      </div>
    </>
  );
}
