import { Outlet } from "react-router-dom";
import Navbar from "../components/layout/Navbar/Navbar";
import Sidebar from "../components/Layout/Sidebar/Sidebar";

export default function Dashboard() {
  return (
    <div className="h-screen overflow-hidden">
      {/* Navbar */}
        <Navbar />
  
      {/* Content Area */}
      <Sidebar />
      <div className="pt-16 flex">         
        {/* Main Content */}
        <main className="ml-64 w-full overflow-y-auto h-[calc(100vh-4rem)] bg-gray-200">
          <Outlet />
        </main>
        
      </div>
    </div>
  );
}
