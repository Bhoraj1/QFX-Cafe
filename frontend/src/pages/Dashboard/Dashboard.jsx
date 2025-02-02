import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import DashSidebar from "../../components/DashSidebar";
import DashUsers from "./DashUsers";
import IntroDash from "./IntroDash";
import BarChart from "./PieChart";

export default function Dashboard() {
  const location = useLocation();
  const [tab, setTab] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  return (
    <div className="flex flex-row min-h-screen">
      {/* Sidebar */}
      <div className="w-56">
        <DashSidebar />
      </div>

      {/* Main Content */}
      <div className="flex mx-auto w-full overflow-scroll">
        {!tab && (
          <div className="flex flex-col">
            <IntroDash />
            <BarChart />
          </div>
        )}
        {tab === "employee-management" && <DashUsers />}
      </div>
    </div>
  );
}
