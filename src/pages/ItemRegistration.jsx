// src/pages/ItemRegistration.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/sidebar";
import { Edit, Trash2, Save, XCircle } from "lucide-react"; // Import icons for actions

export default function ItemRegistration() {
  const [isOpen, setIsOpen] = useState(true);
  const [type, setType] = useState("Gents");
  const [itemName, setItemName] = useState("");
  const [registeredItems, setRegisteredItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null); // State to hold item being edited
  const [editItemName, setEditItemName] = useState(""); // State for the edit input field
  const [editItemType, setEditItemType] = useState("Gents"); // State for the edit type radio

  const navigate = useNavigate();

  // Handle adding a new item
  const handleAddItem = (e) => {
    e.preventDefault();
    if (itemName.trim()) {
      const newItem = {
        id: registeredItems.length > 0 ? Math.max(...registeredItems.map(item => item.id)) + 1 : 1, // Generate unique ID
        type: type,
        name: itemName.trim(),
      };
      setRegisteredItems((prevItems) => [...prevItems, newItem]);
      setItemName("");
      // Optionally keep the type selected or reset to default
      // setType("Gents");
    } else {
      alert("Item Name cannot be empty!");
    }
  };

  // Reset form fields
  const handleReset = () => {
    setItemName("");
    setType("Gents");
    setEditingItem(null); // Clear editing state on form reset
    setEditItemName("");
    setEditItemType("Gents");
  };

  // Handle setting an item for editing
  const handleEdit = (item) => {
    setEditingItem(item.id);
    setEditItemName(item.name);
    setEditItemType(item.type);
  };

  // Handle saving the edited item
  const handleUpdate = (id) => {
    if (editItemName.trim()) {
      setRegisteredItems((prevItems) =>
        prevItems.map((item) =>
          item.id === id ? { ...item, name: editItemName.trim(), type: editItemType } : item
        )
      );
      setEditingItem(null); // Exit editing mode
      setEditItemName("");
      setEditItemType("Gents");
    } else {
      alert("Item Name cannot be empty during update!");
    }
  };

  // Handle cancelling edit mode
  const handleCancelEdit = () => {
    setEditingItem(null);
    setEditItemName("");
    setEditItemType("Gents");
  };


  // Handle deleting an item
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      setRegisteredItems((prevItems) => prevItems.filter((item) => item.id !== id));
      // If the deleted item was currently being edited, clear edit state
      if (editingItem === id) {
        setEditingItem(null);
        setEditItemName("");
        setEditItemType("Gents");
      }
    }
  };

  const handleBack = () => {
    navigate("/MainPage");
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      localStorage.removeItem("authToken");
      navigate("/");
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <Sidebar
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        handleLogout={handleLogout}
        handleBack={handleBack}
      />

      {/* Main Content Area - Adjusted for fixed sidebar */}
      <div
        className={`flex-1 p-8 transition-all duration-300 ${
          isOpen ? "ml-64" : "ml-20" // Dynamically adjust left margin
        }`}
      >
        <div className="max-w-7xl mx-auto"> {/* Increased max-width for side-by-side layout */}
          <h2 className="text-4xl font-extrabold text-blue-800 text-center mb-10">
            Item Management
          </h2>

          {/* Flex container for the two sections */}
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Item Registration Form - Left Section */}
            <div className="lg:w-1/3 bg-white shadow-xl rounded-2xl p-8 flex-shrink-0">
              <h3 className="text-2xl font-bold text-blue-700 mb-6">Register New Item</h3>
              <form onSubmit={handleAddItem} className="space-y-6">
                {/* Type Selection */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Type
                  </label>
                  <div className="flex space-x-6 bg-blue-50 rounded-lg p-3">
                    <label className="flex items-center space-x-2 text-blue-800 font-medium">
                      <input
                        type="radio"
                        value="Gents"
                        checked={type === "Gents"}
                        onChange={(e) => setType(e.target.value)}
                        className="accent-blue-600 h-4 w-4"
                      />
                      <span>Gents</span>
                    </label>
                    <label className="flex items-center space-x-2 text-blue-800 font-medium">
                      <input
                        type="radio"
                        value="Ladies"
                        checked={type === "Ladies"}
                        onChange={(e) => setType(e.target.value)}
                        className="accent-blue-600 h-4 w-4"
                      />
                      <span>Ladies</span>
                    </label>
                  </div>
                </div>

                {/* Item Name Field */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Item Name
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none transition-shadow"
                    placeholder="e.g., T-shirt, Trouser, Saree"
                    value={itemName}
                    onChange={(e) => setItemName(e.target.value)}
                    required
                  />
                </div>

                {/* Buttons */}
                <div className="flex justify-end space-x-4 mt-8">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="bg-gray-300 text-gray-800 font-semibold py-2 px-6 rounded-lg hover:bg-gray-400 transition-all shadow-md"
                  >
                    Reset
                  </button>

                  <button
                    type="submit"
                    className="bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-700 transition-all shadow-md"
                  >
                    Add Item
                  </button>
                </div>
              </form>
            </div>

            {/* Registered Items Table - Right Section */}
            <div className="lg:w-2/3 bg-white shadow-xl rounded-2xl p-8 flex-grow">
              <h3 className="text-2xl font-bold text-blue-700 mb-6">Registered Items</h3>
              {registeredItems.length === 0 ? (
                <p className="text-gray-600 text-center py-4">No items registered yet. Add a new item to see it here!</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                    <thead className="bg-blue-100">
                      <tr>
                        <th className="py-3 px-4 text-left text-sm font-semibold text-blue-800 uppercase tracking-wider border-b">ID</th>
                        <th className="py-3 px-4 text-left text-sm font-semibold text-blue-800 uppercase tracking-wider border-b">Type</th>
                        <th className="py-3 px-4 text-left text-sm font-semibold text-blue-800 uppercase tracking-wider border-b">Item Name</th>
                        <th className="py-3 px-4 text-center text-sm font-semibold text-blue-800 uppercase tracking-wider border-b">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {registeredItems.map((item) => (
                        <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                          <td className="py-3 px-4 text-sm text-gray-800 border-b">{item.id}</td>
                          <td className="py-3 px-4 text-sm text-gray-800 border-b">
                            {editingItem === item.id ? (
                              <div className="flex space-x-2">
                                <label className="flex items-center space-x-1 text-blue-700">
                                  <input
                                    type="radio"
                                    value="Gents"
                                    checked={editItemType === "Gents"}
                                    onChange={(e) => setEditItemType(e.target.value)}
                                    className="accent-blue-600 h-3 w-3"
                                  />
                                  <span>Gents</span>
                                </label>
                                <label className="flex items-center space-x-1 text-blue-700">
                                  <input
                                    type="radio"
                                    value="Ladies"
                                    checked={editItemType === "Ladies"}
                                    onChange={(e) => setEditItemType(e.target.value)}
                                    className="accent-blue-600 h-3 w-3"
                                  />
                                  <span>Ladies</span>
                                </label>
                              </div>
                            ) : (
                              item.type
                            )}
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-800 border-b">
                            {editingItem === item.id ? (
                              <input
                                type="text"
                                value={editItemName}
                                onChange={(e) => setEditItemName(e.target.value)}
                                className="w-full border border-gray-300 rounded-md p-1 text-sm focus:ring-1 focus:ring-blue-500"
                              />
                            ) : (
                              item.name
                            )}
                          </td>
                          <td className="py-3 px-4 text-center text-sm text-gray-800 border-b space-x-2">
                            {editingItem === item.id ? (
                              <>
                                <button
                                  onClick={() => handleUpdate(item.id)}
                                  className="text-green-600 hover:text-green-800 p-1 rounded-full hover:bg-green-100 transition-colors"
                                  title="Save Changes"
                                >
                                  <Save size={18} />
                                </button>
                                <button
                                  onClick={handleCancelEdit}
                                  className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100 transition-colors"
                                  title="Cancel Edit"
                                >
                                  <XCircle size={18} />
                                </button>
                              </>
                            ) : (
                              <>
                                <button
                                  onClick={() => handleEdit(item)}
                                  className="text-blue-600 hover:text-blue-800 p-1 rounded-full hover:bg-blue-100 transition-colors"
                                  title="Edit Item"
                                >
                                  <Edit size={18} />
                                </button>
                                <button
                                  onClick={() => handleDelete(item.id)}
                                  className="text-red-600 hover:text-red-800 p-1 rounded-full hover:bg-red-100 transition-colors"
                                  title="Delete Item"
                                >
                                  <Trash2 size={18} />
                                </button>
                              </>
                            )}
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
      </div>
    </div>
  );
}