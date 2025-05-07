import React, { useState, useEffect } from "react";

import { FaEdit, FaSave, FaEye, FaEyeSlash, FaUser, FaEnvelope, FaPhone, FaUniversity, FaLock } from "react-icons/fa";
import { motion } from "framer-motion";
import Sidebar from "../components/Sidebar";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";


const AdminViewProfile = () => {
  const [adminData, setAdminData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    number: "",
    profilePic: "",
    department: ""
  });
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    // Fetch admin data
    const fetchAdminData = async () => {
      try {
        const response = await axios.get(`https://shaheed-wazir-enterprises.onrender.com/api/auth/getprofile/${user._id}`);
        setAdminData(response.data);
      
        setLoading(false);
      } catch (error) {
        console.error("Error fetching admin data:", error);
        toast.error("Failed to load profile data");
        setLoading(false);
      }
    };

    fetchAdminData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAdminData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      await axios.put("/api/admin/profile", adminData);
      toast.success("Profile updated successfully");
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  if (loading) {
    return (
      <div className="flex h-screen bg-gray-100">
        <Sidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden mt-10">
      {/* Sidebar */}
      {/* <Sidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} /> */}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">  {user.role.charAt(0).toUpperCase() + user.role.slice(1)} Profile</h1>
              <p className="text-gray-600 mt-1">View and manage your account details</p>
            </motion.div>

            <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
              {/* Profile Header */}
              <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white">
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  <div className="relative">
                    <img
                      src={adminData?.profilePic || "https://ui-avatars.com/api/?name=" + encodeURIComponent(adminData.username) + "&background=random"}
                      alt="Profile"
                      className="w-24 h-24 rounded-full object-cover border-4 border-white/20"
                    />
                    {isEditing && (
                      <button className="absolute bottom-0 right-0 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full shadow-md">
                        <label htmlFor="profilePicUpload" className="cursor-pointer">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                          </svg>
                          <input
                            id="profilePicUpload"
                            type="file"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files[0];
                              if (file) {
                                const reader = new FileReader();
                                reader.onloadend = () => {
                                  setAdminData(prev => ({ ...prev, profilePic: reader.result }));
                                };
                                reader.readAsDataURL(file);
                              }
                            }}
                          />
                        </label>
                      </button>
                    )}
                  </div>
                  <div className="text-center sm:text-left">
                    <h2 className="text-xl sm:text-2xl font-bold">
                      {isEditing ? (
                        <input
                          type="text"
                          name="username"
                          value={adminData.username}
                          onChange={handleInputChange}
                          className="bg-white/20 border-b border-white/50 focus:outline-none focus:border-white"
                        />
                      ) : (
                        adminData.username
                      )}
                    </h2>
                    <p className="text-blue-100 mt-1">
                      @{adminData.username}
                    </p>
                    {/* <p className="text-blue-100 mt-2 flex items-center justify-center sm:justify-start">
                      <FaUniversity className="mr-1" />
                      {adminData.department || "Administration"}
                    </p> */}
                  </div>
                </div>
              </div>

              {/* Profile Details */}
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Personal Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                      <FaUser className="mr-2 text-blue-500" />
                      Personal Information
                    </h3>
                    
                    <div className="space-y-3">
                      {/* <div>
                        <label className="block text-sm font-medium text-gray-500 mb-1">Full Name</label>
                        {isEditing ? (
                          <input
                            type="text"
                            name="name"
                            value={adminData.name}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                          />
                        ) : (
                          <p className="text-gray-800">{adminData.name}</p>
                        )}
                      </div> */}

                      <div>
                        <label className="block text-sm font-medium text-gray-500 mb-1">Username</label>
                        {isEditing ? (
                          <input
                            type="text"
                            name="username"
                            value={adminData.username}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                          />
                        ) : (
                          <p className="text-gray-800">@{adminData.username}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-500 mb-1">Email</label>
                        {isEditing ? (
                          <input
                            type="email"
                            name="email"
                            disabled
                            value={adminData.email}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                          />
                        ) : (
                          <p className="text-gray-800">{adminData.email}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Contact & Security */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                      <FaPhone className="mr-2 text-blue-500" />
                      Contact & Security
                    </h3>
                    
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-500 mb-1">Phone Number</label>
                        {isEditing ? (
                          <input
                            type="tel"
                            name="number"
                            value={adminData.number}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                          />
                        ) : (
                          <p className="text-gray-800">{adminData.number || "Not provided"}</p>
                        )}
                      </div>
{/* 
                      <div>
                        <label className="block text-sm font-medium text-gray-500 mb-1">Department</label>
                        {isEditing ? (
                          <input
                            type="text"
                            name="department"
                            value={adminData.department}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                          />
                        ) : (
                          <p className="text-gray-800">{adminData.department || "Administration"}</p>
                        )}
                      </div> */}

                      <div>
                        <label className="block text-sm font-medium text-gray-500 mb-1">Password</label>
                        <div className="relative">
                          {isEditing ? (
                            <>
                              <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                disabled
                                value={adminData.password}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 pr-10"
                              />
                              <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
                              >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                              </button>
                            </>
                          ) : (
                            <div className="flex items-center">
                              <FaLock className="text-gray-400 mr-2" />
                              <span className="text-gray-800">••••••••</span>
                              <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="ml-2 text-gray-500 hover:text-gray-700"
                              >
                                <FaEye />
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                {/* <div className="mt-8 flex justify-end">
                  {isEditing ? (
                    <div className="space-x-3">
                      <button
                        onClick={() => setIsEditing(false)}
                        className="px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSave}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
                      >
                        <FaSave className="mr-2" />
                        Save Changes
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
                    >
                      <FaEdit className="mr-2" />
                      Edit Profile
                    </button>
                  )}
                </div> */}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminViewProfile;