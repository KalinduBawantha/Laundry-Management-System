// src/pages/ItemRegistration.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/sidebar";
import { Edit, Trash2, PlusCircle, Save, XCircle } from "lucide-react"; // Import more icons for clarity
import { toast, ToastContainer } from 'react-toastify'; // For notifications
import 'react-toastify/dist/ReactToastify.css'; // Toast styles

export default function ItemRegistration() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);

  // State for the item registration form
  const [formData, setFormData] = useState({
    category: "",
    item: "",
    service: "",
    delivery: "",
    price: "",
  });

  // State to store all registered items
  const [registeredItems, setRegisteredItems] = useState(() => {
    // Load from local storage or start with an empty array
    const savedItems = localStorage.getItem("registeredItems");
    return savedItems ? JSON.parse(savedItems) : [];
  });

  // State to track if we are currently editing an item
  const [editingItemId, setEditingItemId] = useState(null);

  // Save registered items to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem("registeredItems", JSON.stringify(registeredItems));
  }, [registeredItems]);

  const handleBack = () => navigate("/MainPage");
  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      localStorage.removeItem("authToken");
      navigate("/");
    }
  };

  const itemsByCategory = {
    Gents: ["Shirt", "Trouser", "Coat", "T-Shirt", "Short", "Sarong"],
    Ladies: ["Saree", "Blouse", "Frock", "Skirt", "Dupatta", "Abaya"],
  };

  const services = ["Wash & Dry", "Dry Cleaning", "Pressing", "Ironing"];
  const deliveryOptions = [
    "Add 05 Days",
    "Add 02 Days",
    "One Day",
    "Normal",
    "Express",
  ];

  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCategoryChange = (category) => {
    setFormData({
      category,
      item: "",
      service: "",
      delivery: "",
      price: "",
    });
  };

  const handleItemSelect = (item) => {
    setFormData((prev) => ({
      ...prev,
      item,
      service: "",
      delivery: "",
      price: "",
    }));
  };

  const handleServiceSelect = (service) => {
    setFormData((prev) => ({
      ...prev,
      service,
      delivery: "",
      price: "",
    }));
  };

  const handleDeliverySelect = (delivery) => {
    setFormData((prev) => ({
      ...prev,
      delivery,
      price: "",
    }));
  };

  const resetForm = () => {
    setFormData({
      category: "",
      item: "",
      service: "",
      delivery: "",
      price: "",
    });
    setEditingItemId(null); // Clear editing state
  };

  const handleAddItem = () => {
    if (!formData.category || !formData.item || !formData.service || !formData.delivery || !formData.price) {
      toast.error("Please fill all fields before adding.");
      return;
    }

    const newItem = {
      id: Date.now(), // Unique ID for the item
      ...formData,
      price: parseFloat(formData.price), // Ensure price is a number
    };

    setRegisteredItems((prevItems) => [...prevItems, newItem]);
    toast.success("Item added successfully!");
    resetForm();
  };

  const handleEditItem = (item) => {
    setEditingItemId(item.id);
    setFormData({ ...item, price: item.price.toString() }); // Set form data for editing
  };

  const handleUpdateItem = () => {
    if (!formData.category || !formData.item || !formData.service || !formData.delivery || !formData.price) {
      toast.error("Please fill all fields before updating.");
      return;
    }

    setRegisteredItems((prevItems) =>
      prevItems.map((item) =>
        item.id === editingItemId
          ? { ...formData, id: editingItemId, price: parseFloat(formData.price) }
          : item
      )
    );
    toast.success("Item updated successfully!");
    resetForm();
  };

  const handleDeleteItem = (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      setRegisteredItems((prevItems) => prevItems.filter((item) => item.id !== id));
      toast.info("Item deleted.");
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />

      <Sidebar
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        handleLogout={handleLogout}
        handleBack={handleBack} // Assuming you want a back button in the sidebar
      />

      <div
        className={`flex-1 p-8 transition-all duration-300 ${
          isOpen ? "ml-64" : "ml-20"
        }`}
      >
        <div className="bg-white rounded-2xl shadow-xl w-full p-8 mb-10">
          <h1 className="text-3xl font-bold text-blue-700 text-center mb-8">
            {editingItemId ? "Edit Item Registration" : "New Item Registration"}
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {/* Category */}
            <div className="bg-blue-50 p-4 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold text-blue-800 mb-3">Category</h2>
              <div className="flex gap-4 flex-wrap">
                {["Gents", "Ladies"].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => handleCategoryChange(cat)}
                    className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                      formData.category === cat
                        ? "bg-blue-600 text-white shadow"
                        : "bg-blue-100 text-blue-800 hover:bg-blue-200"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Items */}
            <div className="bg-green-50 p-4 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold text-green-800 mb-3">Select Item</h2>
              <div className="grid grid-cols-2 gap-3 max-h-48 overflow-y-auto pr-2">
                {formData.category &&
                  itemsByCategory[formData.category].map((item) => (
                    <button
                      key={item}
                      onClick={() => handleItemSelect(item)}
                      className={`py-2 px-4 rounded-lg font-medium transition-colors ${
                        formData.item === item
                          ? "bg-green-600 text-white shadow"
                          : "bg-green-100 text-green-800 hover:bg-green-200"
                      }`}
                    >
                      {item}
                    </button>
                  ))}
              </div>
            </div>

            {/* Service */}
            <div className="bg-yellow-50 p-4 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold text-yellow-800 mb-3">Service Type</h2>
              <div className="grid grid-cols-2 gap-3">
                {services.map((srv) => (
                  <button
                    key={srv}
                    onClick={() => handleServiceSelect(srv)}
                    className={`py-2 px-4 rounded-lg font-medium transition-colors ${
                      formData.service === srv
                        ? "bg-yellow-600 text-white shadow"
                        : "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                    }`}
                  >
                    {srv}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Delivery */}
            <div className="bg-purple-50 p-4 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold text-purple-800 mb-3">Delivery Option</h2>
              <div className="grid grid-cols-2 gap-3">
                {deliveryOptions.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => handleDeliverySelect(opt)}
                    className={`py-2 px-4 rounded-lg font-medium transition-colors ${
                      formData.delivery === opt
                        ? "bg-purple-600 text-white shadow"
                        : "bg-purple-100 text-purple-800 hover:bg-purple-200"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Input */}
            <div className="bg-red-50 p-4 rounded-lg shadow-sm flex flex-col justify-between">
              <div>
                <h2 className="text-lg font-semibold text-red-800 mb-3">Price (Rs.)</h2>
                <input
                  type="number"
                  name="price"
                  placeholder="Enter price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="border border-red-300 rounded-lg w-full p-3 text-lg focus:ring-2 focus:ring-red-400 text-gray-800"
                />
              </div>
              <div className="flex gap-4 mt-6">
                {editingItemId ? (
                  <button
                    onClick={handleUpdateItem}
                    className="flex-1 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition font-semibold text-lg flex items-center justify-center space-x-2"
                  >
                    <Save size={20} />
                    <span>Update Item</span>
                  </button>
                ) : (
                  <button
                    onClick={handleAddItem}
                    className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-semibold text-lg flex items-center justify-center space-x-2"
                  >
                    <PlusCircle size={20} />
                    <span>Add Item</span>
                  </button>
                )}
                <button
                  onClick={resetForm}
                  className="flex-1 bg-gray-400 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-500 transition font-semibold text-lg flex items-center justify-center space-x-2"
                >
                  <XCircle size={20} />
                  <span>Cancel</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Registered Items Table */}
        <div className="bg-white rounded-2xl shadow-xl w-full p-8">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
            Registered Items
          </h2>
          {registeredItems.length === 0 ? (
            <p className="text-gray-600 text-center">No items registered yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Item
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Service
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Delivery
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price (Rs.)
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {registeredItems.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {item.category}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.item}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.service}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.delivery}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.price.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <button
                            onClick={() => handleEditItem(item)}
                            className="text-indigo-600 hover:text-indigo-900 p-1 rounded-md hover:bg-indigo-100 transition-colors"
                            title="Edit Item"
                          >
                            <Edit size={20} />
                          </button>
                          <button
                            onClick={() => handleDeleteItem(item.id)}
                            className="text-red-600 hover:text-red-900 p-1 rounded-md hover:bg-red-100 transition-colors"
                            title="Delete Item"
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
    </div>
  );
}