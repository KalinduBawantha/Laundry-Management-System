// src/components/Sidebar.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom"; // Import useLocation
import {
  Menu,
  X,
  Shirt,
  Truck,
  DollarSign,
  ClipboardList,
  LogOut,
  LayoutDashboard, // Import for Dashboard icon
  ArrowLeftCircle, // Keeping it here in case you need it later
} from "lucide-react";

// The Sidebar component receives props from MainPage
export default function Sidebar({ isOpen, setIsOpen, handleLogout }) {
  const location = useLocation(); // To highlight active sidebar link

  return (
    <div
      className={`fixed top-0 left-0 bottom-0 ${ // Added fixed, top-0, left-0, bottom-0
        isOpen ? "w-64" : "w-20"
      } bg-blue-700 text-white transition-all duration-300 shadow-lg flex flex-col justify-between z-50`} // Added z-50 to ensure it's above other content
    >
      <div>
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b border-blue-500">
          <h1
            className={`text-xl font-bold tracking-wide transition-all duration-300 ${
              !isOpen && "hidden"
            }`}
          >
            Gamma Laundry
          </h1>
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Sidebar Links */}
        <nav className="mt-4">
          <ul className="space-y-2">
            {/* New Dashboard Tab */}
            <li>
              <Link
                to="/Dashboard" // Assuming your dashboard route is /Dashboard
                className={`flex items-center gap-3 px-5 py-3 transition-colors ${
                  location.pathname === "/Dashboard"
                    ? "bg-blue-800 rounded-r-full"
                    : "hover:bg-blue-600"
                }`}
              >
                <LayoutDashboard size={20} /> {/* Dashboard Icon */}
                {isOpen && <span>Dashboard</span>}
              </Link>
            </li>

            <li>
              <Link
                to="/ItemRegistration"
                className={`flex items-center gap-3 px-5 py-3 transition-colors ${
                  location.pathname === "/ItemRegistration"
                    ? "bg-blue-800 rounded-r-full"
                    : "hover:bg-blue-600"
                }`}
              >
                <Shirt size={20} />
                {isOpen && <span>Item Registration</span>}
              </Link>
            </li>

            <li>
              <Link
                to="/Order"
                className={`flex items-center gap-3 px-5 py-3 transition-colors ${
                  location.pathname === "/Order"
                    ? "bg-blue-800 rounded-r-full"
                    : "hover:bg-blue-600"
                }`}
              >
                <ClipboardList size={20} />
                {isOpen && <span>Orders</span>}
              </Link>
            </li>

            <li>
              <Link
                to="/OrderDelivery"
                className={`flex items-center gap-3 px-5 py-3 transition-colors ${
                  location.pathname === "/OrderDelivery"
                    ? "bg-blue-800 rounded-r-full"
                    : "hover:bg-blue-600"
                }`}
              >
                <Truck size={20} />
                {isOpen && <span>Delivery</span>}
              </Link>
            </li>

            <li>
              <Link
                to="/ItemPriceRegistration"
                className={`flex items-center gap-3 px-5 py-3 transition-colors ${
                  location.pathname === "/ItemPriceRegistration"
                    ? "bg-blue-800 rounded-r-full"
                    : "hover:bg-blue-600"
                }`}
              >
                <DollarSign size={20} />
                {isOpen && <span>Item Price Registration</span>}
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Logout Button (Bottom Red Section) */}
      <div className="p-4 border-t border-blue-500">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-5 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all duration-300"
        >
          <LogOut size={20} />
          {isOpen && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
}