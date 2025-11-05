// src/pages/MainPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react"; // Import X icon for the close button

// Import the Sidebar component
import Sidebar from "../components/sidebar";

export default function MainPage() {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false); // State for the new popup message

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      {/* Sidebar Component */}
      <Sidebar
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        handleLogout={handleLogout}
      />

      {/* Main Content - Adjusted for fixed sidebar */}
      <div
        className={`flex flex-col min-h-screen bg-gray-100 flex-1 transition-all duration-300 ${
          isOpen ? "ml-64" : "ml-20" // Dynamically adjust left margin
        }`}
      >
        <header className="w-full bg-stone-50 py-4 px-6 flex items-center justify-start shadow-md">
          <div className="text-black text-xl font-semibold">Dashboard Overview</div>
        </header>

        <div className="flex flex-1 p-6">
          <main className="flex-1 bg-white rounded-xl shadow-lg p-6 flex flex-col">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Welcome to Your Laundry Dashboard!</h2>

            {/* Dashboard Cards/Sections */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {/* Card 1: Quick Add Order */}
              <div className="bg-blue-50 p-6 rounded-lg shadow-md flex flex-col items-center justify-center text-center">
                <h3 className="text-lg font-semibold text-blue-800 mb-4">New Order</h3>
                <button
                  onClick={() => {
                  setShowPopup(false);
                  navigate('/Order'); // Navigate to the Order page
                }}
                  className="w-24 h-24 border-2 border-dashed border-blue-600 rounded-lg flex items-center justify-center text-blue-600 hover:bg-blue-100 transition-colors"
                  aria-label="Add New Order"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </button>
                <p className="mt-3 text-gray-600">Click to add a new laundry order.</p>
              </div>

              {/* Card 2: Orders Summary (Example) */}
              <div className="bg-green-50 p-6 rounded-lg shadow-md flex flex-col justify-between">
                <h3 className="text-lg font-semibold text-green-800 mb-4">Active Orders</h3>
                <p className="text-4xl font-bold text-green-700">15</p>
                <p className="text-gray-600 mt-2">Orders currently in progress.</p>
                <button
                  onClick={() => navigate('/Order')} // Link to the Orders page
                  className="mt-4 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md text-sm transition-colors"
                >
                  View All Orders
                </button>
              </div>

              {/* Card 3: Recent Deliveries (Example) */}
              <div className="bg-purple-50 p-6 rounded-lg shadow-md flex flex-col justify-between">
                <h3 className="text-lg font-semibold text-purple-800 mb-4">Upcoming Deliveries</h3>
                <p className="text-4xl font-bold text-purple-700">7</p>
                <p className="text-gray-600 mt-2">Orders scheduled for delivery today/tomorrow.</p>
                <button
                  onClick={() => navigate('/OrderDelivery')} // Link to the Delivery page
                  className="mt-4 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-md text-sm transition-colors"
                >
                  Manage Deliveries
                </button>
              </div>
            </div>

            {/* You can add more dashboard sections here, e.g., charts, recent activity, etc. */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-md mt-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Stats</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <p className="text-gray-700">Revenue Today: <span className="font-bold text-green-600">Rs. 15,000.00</span></p>
                    <p className="text-gray-700">New Customers This Week: <span className="font-bold text-blue-600">5</span></p>
                    <p className="text-gray-700">Items Processed: <span className="font-bold text-purple-600">320</span></p>
                    <p className="text-gray-700">Pending Payments: <span className="font-bold text-red-600">Rs. 2,500.00</span></p>
                </div>
            </div>

          </main>
        </div>
      </div>


    </div>
  );
}