// src/pages/Order.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { X, Edit, Trash2 } from "lucide-react"; // Import new icons

import Sidebar from "../components/sidebar";

// Define a constant for item prices (you can fetch this from a backend)
const ITEM_PRICES = {
  "T shirt": 500,
  "Trouser": 750,
  "Saree": 1200,
  "Coat": 1500,
  "Bedsheet": 800,
  "Jeans": 700,
};

export default function Order() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showModal, setShowModal] = useState(false); // State to control modal visibility

  const [form, setForm] = useState({
    billNo: "", // Changed to empty for new orders, or populate when editing
    customerName: "",
    teleNo: "",
    address: "",
  });

  const [service, setService] = useState("");
  const [delivery, setDelivery] = useState("");
  const [type, setType] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [advance, setAdvance] = useState(0);

  // New state to store added orders
  const [orders, setOrders] = useState([]);
  // State to track if we are editing an existing order
  const [editingOrderId, setEditingOrderId] = useState(null);

  const itemsList = [
    "T shirt",
    "Trouser",
    "Saree",
    "Coat",
    "Bedsheet",
    "Jeans",
  ];

  // Function to reset all form and modal states
  const resetAllFormStates = () => {
    setForm({
      billNo: "",
      customerName: "",
      teleNo: "",
      address: "",
    });
    setSelectedDate(new Date());
    setService("");
    setDelivery("");
    setType("");
    setSelectedItems([]);
    setAdvance(0);
    setEditingOrderId(null); // Clear editing state
  };

  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleItemToggle = (itemName) => {
    setSelectedItems((prev) => {
      const existingItem = prev.find((item) => item.name === itemName);
      if (existingItem) {
        return prev.filter((item) => item.name !== itemName);
      } else {
        return [...prev, { name: itemName, quantity: 1 }];
      }
    });
  };

  const handleQuantityChange = (itemName, quantity) => {
    setSelectedItems((prev) =>
      prev.map((item) =>
        item.name === itemName
          ? { ...item, quantity: Math.max(1, parseInt(quantity, 10) || 1) }
          : item
      )
    );
  };

  const total = selectedItems.reduce(
    (sum, item) => sum + (ITEM_PRICES[item.name] || 0) * item.quantity,
    0
  );
  const balance = total - advance;

  const handleResetModal = () => {
    setService("");
    setDelivery("");
    setType("");
    setSelectedItems([]);
    setAdvance(0);
  };

  const handleSaveOrUpdateOrder = () => {
    const orderData = {
      billNo: form.billNo,
      customerName: form.customerName,
      teleNo: form.teleNo,
      address: form.address,
      orderDate: selectedDate.toLocaleDateString(),
      service,
      delivery,
      type,
      items: selectedItems.map(item => ({...item, price: ITEM_PRICES[item.name]})),
      advance,
      total,
      balance,
    };

    if (editingOrderId) {
      // Update existing order
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === editingOrderId ? { ...order, ...orderData } : order
        )
      );
      alert("Order updated successfully!");
    } else {
      // Add new order
      const newId = orders.length > 0 ? Math.max(...orders.map(o => o.id)) + 1 : 1;
      setOrders((prevOrders) => [...prevOrders, { ...orderData, id: newId }]);
      alert("Order added successfully!");
    }

    setShowModal(false);
    resetAllFormStates(); // Reset all form and editing states
  };

  const handleEditOrder = (orderToEdit) => {
    setEditingOrderId(orderToEdit.id);

    // Populate main form fields
    setForm({
      billNo: orderToEdit.billNo,
      customerName: orderToEdit.customerName,
      teleNo: orderToEdit.teleNo,
      address: orderToEdit.address,
    });

    // Populate date picker
    setSelectedDate(new Date(orderToEdit.orderDate));

    // Populate modal fields
    setService(orderToEdit.service);
    setDelivery(orderToEdit.delivery);
    setType(orderToEdit.type);
    setSelectedItems(orderToEdit.items.map(item => ({ name: item.name, quantity: item.quantity }))); // Ensure price isn't carried to avoid calculation issues
    setAdvance(orderToEdit.advance);

    setShowModal(true); // Open the modal for editing
  };

  const handleDeleteOrder = (orderId) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      setOrders((prevOrders) => prevOrders.filter((order) => order.id !== orderId));
      alert("Order deleted successfully!");
    }
  };


  const handleCloseModal = () => {
    setShowModal(false);
    resetAllFormStates(); // Reset everything when modal is closed
  };

  const handleBack = () => navigate("/MainPage");
  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      localStorage.removeItem("authToken");
      navigate("/");
    }
  };

  // Effect to reset form when not editing
  useEffect(() => {
    if (!editingOrderId && !showModal) {
      resetAllFormStates();
    }
  }, [editingOrderId, showModal]);


  const DatePickerInput = ({ value, onChange }) => {
    const [showCalendar, setShowCalendar] = useState(false);
    const formattedDate = value ? value.toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
    }) : '';

    return (
      <div className="relative">
        <div className="flex items-center border border-gray-300 p-2 rounded-md focus-within:ring-2 focus-within:ring-purple-400 focus-within:border-transparent">
          <input
            type="text"
            value={formattedDate}
            readOnly
            onClick={() => setShowCalendar(!showCalendar)}
            className="flex-1 bg-transparent outline-none cursor-pointer text-gray-800"
          />
          <button
            type="button"
            onClick={() => setShowCalendar(!showCalendar)}
            className="ml-2 text-gray-500 hover:text-gray-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </button>
        </div>
        {showCalendar && (
          <div className="absolute z-10 top-full right-0 mt-2">
            <Calendar
              onChange={(date) => {
                onChange(date);
                setShowCalendar(false);
              }}
              value={value}
              className="rounded-lg shadow-lg border border-gray-300"
            />
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        handleLogout={handleLogout}
        handleBack={handleBack}
      />

      {/* Main Content Area - Adjusted for fixed sidebar */}
      <div
        className={`flex-1 bg-gray-200 p-4 flex flex-col max-w-screen items-center transition-all duration-300 ${
          isOpen ? "ml-64" : "ml-20" // Dynamically adjust left margin
        }`}
      >
        <div className="bg-white shadow-lg rounded-xl p-8 max-w-7xl w-full relative mb-8">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">
            {editingOrderId ? "Edit Order Form" : "Add Order Form"}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <div>
              <label className="block mb-1 text-gray-700 text-sm font-medium">Bill No :</label>
              <input
                type="text"
                name="billNo"
                value={form.billNo}
                onChange={handleInput}
                placeholder="Value"
                className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-purple-400 focus:border-transparent text-gray-800"
              />
            </div>
            <div className="relative">
              <label className="block mb-1 text-gray-700 text-sm font-medium">Date</label>
              <DatePickerInput
                onChange={setSelectedDate}
                value={selectedDate}
              />
            </div>
            <div>
              <label className="block mb-1 text-gray-700 text-sm font-medium">Customer Name :</label>
              <input
                type="text"
                name="customerName"
                value={form.customerName}
                onChange={handleInput}
                placeholder="Value"
                className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-purple-400 focus:border-transparent text-gray-800"
              />
            </div>
            <div>
              <label className="block mb-1 text-gray-700 text-sm font-medium">Tele.No</label>
              <input
                type="text"
                name="teleNo"
                value={form.teleNo}
                onChange={handleInput}
                placeholder="Value"
                className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-purple-400 focus:border-transparent text-gray-800"
              />
            </div>
          </div>

          <div className="mt-6">
            <label className="block mb-1 text-gray-700 text-sm font-medium">Address:</label>
            <input
              type="text"
              name="address"
              value={form.address}
              onChange={handleInput}
              placeholder="Value"
              className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-purple-400 focus:border-transparent text-gray-800"
            />
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="mt-8 bg-purple-700 hover:bg-purple-800 text-white py-3 w-full rounded-md font-semibold transition-all flex items-center justify-center space-x-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            <span>{editingOrderId ? "Edit Items / Services" : "Select Items / Services"}</span>
          </button>
        </div>

        {/* Orders Table */}
        <div className="bg-white shadow-lg rounded-xl p-8 max-w-7xl w-full">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">Added Orders</h2>
          {orders.length === 0 ? (
            <p className="text-gray-600">No orders added yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Bill No
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Order Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Service
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Delivery
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Items
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total (Rs.)
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Advance (Rs.) {/* New column header */}
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Balance (Rs.)
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {orders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {order.billNo}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {order.customerName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {order.orderDate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {order.service}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {order.delivery}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                        {order.items.map(item => `${item.name} (x${item.quantity})`).join(', ')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {order.total.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {order.advance.toFixed(2)} {/* Display advance payment */}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {order.balance.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleEditOrder(order)}
                            className="text-indigo-600 hover:text-indigo-900 p-1 rounded-md hover:bg-indigo-100 transition-colors"
                            title="Edit Order"
                          >
                            <Edit size={20} />
                          </button>
                          <button
                            onClick={() => handleDeleteOrder(order.id)}
                            className="text-red-600 hover:text-red-900 p-1 rounded-md hover:bg-red-100 transition-colors"
                            title="Delete Order"
                          >
                            <Trash2 size={20} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Modal Popup */}
      {showModal && (
        <div className="fixed inset-0 bg-stone-950/90 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full relative max-h-[95vh] overflow-hidden flex flex-col">
            {/* Close Button - positioned absolutely within this container */}
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 z-20 p-1 rounded-full bg-white hover:bg-gray-100 transition-colors"
              aria-label="Close modal"
            >
              <X size={24} />
            </button>

            {/* Modal Header */}
            <div className="p-6 border-b border-gray-200">
                <h2 className="text-3xl font-bold text-gray-800 text-center">
                    {editingOrderId ? "Edit Items & Services" : "Select Items & Services"}
                </h2>
            </div>


            <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
              {/* Left Section - Main Options */}
              <div className="md:w-2/3 p-6 overflow-y-auto border-r md:border-r-gray-200 grid grid-cols-1 lg:grid-cols-2 gap-6">

                 {/* Type & Items */}
                 <div className="bg-yellow-50 p-4 rounded-lg shadow-sm lg:col-span-1">
                  <h3 className="font-semibold mb-3 text-lg text-yellow-800">Garment Type</h3>
                  <div className="flex gap-2 mb-4">
                    {["Gent", "Ladies"].map((t) => (
                      <button
                        key={t}
                        onClick={() => setType(t)}
                        className={`flex-1 py-2 rounded-lg font-medium transition-colors ${
                          type === t
                            ? "bg-yellow-600 text-white shadow"
                            : "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>

                  {/* Items with Quantity */}
                  <h3 className="font-semibold mb-3 text-lg text-yellow-800 border-t pt-4 mt-4 border-yellow-200">Select Items</h3>
                  <div className="space-y-2 max-h-90 overflow-y-auto pr-2">
                    {itemsList.map((item) => {
                      const isSelected = selectedItems.some((sItem) => sItem.name === item);
                      const currentQuantity = isSelected
                        ? selectedItems.find((sItem) => sItem.name === item)?.quantity || 1
                        : 0;

                      return (
                        <div
                          key={item}
                          className="flex items-center justify-between p-2 rounded-md bg-white border border-gray-200"
                        >
                          <span className="font-medium text-gray-700 w-1/2">{item}</span>
                          <div className="flex items-center gap-3">
                            {isSelected && (
                                <input
                                    type="number"
                                    min="1"
                                    value={currentQuantity}
                                    onChange={(e) => handleQuantityChange(item, e.target.value)}
                                    className="w-16 text-center border border-gray-300 rounded-md py-1 px-2 text-gray-800 focus:ring-2 focus:ring-yellow-400"
                                />
                            )}
                            <label className="inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                className="sr-only"
                                checked={isSelected}
                                onChange={() => handleItemToggle(item)}
                              />
                              <div
                                className={`w-10 h-5 flex items-center rounded-full p-1 transition-all ${
                                  isSelected
                                    ? "bg-yellow-500"
                                    : "bg-gray-300"
                                }`}
                              >
                                <div
                                  className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ${
                                    isSelected
                                      ? "translate-x-5"
                                      : ""
                                  }`}
                                />
                              </div>
                            </label>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="flex flex-col gap-6"> {/* New container for Service and Delivery */}
                    {/* Service */}
                    <div className="bg-blue-50 p-4 rounded-lg shadow-sm">
                    <h3 className="font-semibold mb-3 text-lg text-blue-800">Service Type</h3>
                    {["Wash & Dry", "Dry Cleaning", "Ironining", "Pressing"].map(
                        (s) => (
                        <button
                            key={s}
                            onClick={() => setService(s)}
                            className={`w-full mb-2 py-2 rounded-lg font-medium transition-colors ${
                            service === s
                                ? "bg-blue-600 text-white shadow"
                                : "bg-blue-100 text-blue-800 hover:bg-blue-200"
                            }`}
                        >
                            {s}
                        </button>
                        )
                    )}
                    </div>

                    {/* Delivery Time */}
                    <div className="bg-green-50 p-4 rounded-lg shadow-sm">
                    <h3 className="font-semibold mb-3 text-lg text-green-800">Delivery Schedule</h3>
                    {["After 05 Days", "After 03 Days", "One Day", "Express", "Normal"].map(
                        (d) => (
                        <button
                            key={d}
                            onClick={() => setDelivery(d)}
                            className={`w-full mb-2 py-2 rounded-lg font-medium transition-colors ${
                            delivery === d
                                ? "bg-green-600 text-white shadow"
                                : "bg-green-100 text-green-800 hover:bg-green-200"
                            }`}
                        >
                            {d}
                        </button>
                        )
                    )}
                    </div>
                </div>

              </div>

              {/* Right Section (Total & Actions) */}
              <div className="md:w-1/3 bg-gray-800 text-white p-6 flex flex-col justify-between">
                <div>
                  <h2 className="text-3xl font-bold mb-6 text-center text-purple-200">Order Summary</h2>

                  <div className="bg-gray-700 p-4 rounded-lg mb-4">
                    <p className="text-lg font-medium text-gray-300">Total Items:</p>
                    <p className="text-xl font-bold text-white mb-4">{selectedItems.reduce((sum, item) => sum + item.quantity, 0)}</p>

                    <p className="text-lg font-medium text-gray-300">Subtotal:</p>
                    <p className="text-4xl font-extrabold text-white mb-6">Rs.{total.toFixed(2)}</p>
                  </div>

                  <div className="mt-4">
                    <label className="block text-gray-300 font-medium mb-2">Advance Payment:</label>
                    <input
                      type="number"
                      value={advance}
                      onChange={(e) => setAdvance(parseFloat(e.target.value))}
                      className="w-full mt-1 text-gray-900 p-3 rounded-md bg-white border border-gray-300 focus:ring-2 focus:ring-purple-400"
                      placeholder="0.00"
                    />
                  </div>

                  <div className="mt-6 p-4 bg-purple-600 rounded-lg">
                    <label className="block text-purple-100 font-semibold mb-2">Balance Due:</label>
                    <div className="bg-white text-gray-900 p-3 rounded-md font-bold text-2xl text-center">
                      Rs.{balance.toFixed(2)}
                    </div>
                  </div>
                </div>

                {/* Action Buttons - Sticky to bottom */}
                <div className="mt-8 flex flex-row gap-4">
                  <button
                    onClick={handleSaveOrUpdateOrder}
                    className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-semibold text-lg transition-colors shadow-md"
                  >
                    {editingOrderId ? "Update Order" : "Save Order"}
                  </button>
                  <button
                    onClick={handleResetModal}
                    className="flex-1 bg-gray-400 text-gray-800 hover:bg-gray-500 py-3 rounded-lg font-semibold text-lg transition-colors shadow-md"
                  >
                    Reset Selections
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}