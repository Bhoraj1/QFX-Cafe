import { useEffect, useState } from "react";
import { Sidebar } from "flowbite-react";
import {
  FaHome,
  FaClipboardList,
  FaUserTie,
  FaMoneyBill,
} from "react-icons/fa";
import {
  MdOutlineSwapHoriz,
  MdMenu,
  MdOutlineInventory2,
} from "react-icons/md";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export default function DashSidebar() {
  // const [isOpen, setIsOpen] = useState({
  //   dashboard: false,
  //   users: false,
  //   settings: false,
  // });
  const location = useLocation();
  const [tab, setTab] = useState("");
  // const { currentUser } = useSelector((state) => state.user);
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  const toggleSection = (section) => {
    setIsOpen((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <div className="flex min-h-screen h-full ">
      {/* Sidebar */}
      <div className="w-56  bg-gray-800 font-semibold   ">
        <Sidebar aria-label="Sidebar ">
          <Sidebar.ItemGroup className="border-0 m-0">
            <Sidebar.Item
              className="items-center text-white"
              href="dashboard"
              icon={FaHome}
              onClick={() => toggleSection("dashboard")}
            >
              <div className="flex gap-7">Dashboard</div>
            </Sidebar.Item>
            <Sidebar.Item
              className="text-white"
              href="#"
              icon={MdOutlineSwapHoriz}
              onClick={() => toggleSection("users")}
            >
              <div className="flex gap-7">Transactions</div>
            </Sidebar.Item>
            <Sidebar.Item
              className="text-white"
              href="#"
              icon={MdMenu}
              onClick={() => toggleSection("users")}
            >
              <div className="gap-7">Menu Management</div>
            </Sidebar.Item>
            <Sidebar.Item
              className="text-white"
              href="#"
              icon={FaClipboardList}
              onClick={() => toggleSection("users")}
            >
              <div className=" gap-7">Order Management</div>
            </Sidebar.Item>
            {/* {currentUser?.role === "super_admin" && currentUser?.isAdmin && ( */}
              <Sidebar.Item
                className="text-white"
                href="/dashboard?tab=employee-management"
                icon={FaUserTie}
                onClick={() => toggleSection("users")}
              >
                <p>
                  Employee <br /> Management
                </p>
              </Sidebar.Item>
            {/* )} */}
            <Sidebar.Item
              className="text-white"
              href="#"
              active={tab === "reports"}
              icon={HiOutlineDocumentReport}
              onClick={() => toggleSection("reports")}
            >
              <div className="flex gap-7">Reports</div>
            </Sidebar.Item>
            <Sidebar.Item
              className="text-white"
              href="#"
              icon={MdOutlineInventory2}
              onClick={() => toggleSection("settings")}
            >
              <div className="flex gap-7">Inventory</div>
            </Sidebar.Item>
            <Sidebar.Item
              className="text-white"
              href="#"
              icon={FaMoneyBill}
              onClick={() => toggleSection("settings")}
            >
              <div className="flex gap-7">Billing</div>
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar>
      </div>
    </div>
  );
}
