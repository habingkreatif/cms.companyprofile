"use client";

import { useState, useEffect } from "react";
import { useAuthViewModel } from "@/presentation/hooks/useAuthViewModel";
import { AnimatePresence, motion } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Shield,
  Edit2,
  Save,
  X,
  LogOut,
  CheckCircle,
  AlertCircle,
  Key,
  Smartphone,
  Bell,
  Briefcase,
  Building,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const { user, loading, updateProfile, logout } = useAuthViewModel();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    phone: "",
    address: "",
    position: "",
    department: "",
    created_at: "",
  });
  const [updating, setUpdating] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const router = useRouter();

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || "",
        phone: user.phone || "",
        address: user.address || "",
        position: user.position || "",
        department: user.department || "",
        created_at: user.created_at || "",
      });
    }
  }, [user]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdating(true);

    try {
      const success = await updateProfile(formData);
      if (success) {
        setSaveSuccess(true);
        setIsEditing(false);
        setTimeout(() => setSaveSuccess(false), 3000);
      }
    } catch (error) {
      console.error("Update failed:", error);
    } finally {
      setUpdating(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  const handleCancel = () => {
    setIsEditing(false);
    if (user) {
        setFormData({
            username: user.username || "",
            phone: user.phone || "",
            address: user.address || "",
            position: user.position || "",
            department: user.department || "",
            created_at: user.created_at || "",
        });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-lg shadow-sm max-w-md border border-gray-200">
          <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Access Required
          </h2>
          <p className="text-gray-600 mb-6">Please login to access this page</p>
          <button
            onClick={() => router.push("/login")}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: "profile", label: "Profile", icon: <User className="w-4 h-4" /> },
    { id: "security", label: "Security", icon: <Key className="w-4 h-4" /> },
    {
      id: "preferences",
      label: "Preferences",
      icon: <Bell className="w-4 h-4" />,
    },
  ];

  const formatDate = (dateString?: string) => {
    if (!dateString) return "Not available";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen ">
      <AnimatePresence>
        {saveSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-4 right-4 z-50"
          >
            <div className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-sm flex items-center space-x-2">
              <CheckCircle className="w-4 h-4" />
              <span className="text-sm font-medium">Profile updated</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">
            Account Settings
          </h1>
          <p className="text-gray-600 mt-1">
            Manage your account information and preferences
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left sidebar - Tabs */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="space-y-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2.5 text-sm rounded-md transition-colors ${
                      activeTab === tab.id
                        ? "bg-blue-50 text-blue-700"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {tab.icon}
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center space-x-2 px-3 py-2.5 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="lg:col-span-3">
            {activeTab === "profile" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                  {/* Profile Header */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900">
                        Profile Information
                      </h2>
                      <p className="text-gray-600 text-sm mt-1">
                        Update your personal details
                      </p>
                    </div>
                    {!isEditing ? (
                      <button
                        onClick={() => setIsEditing(true)}
                        className="flex items-center space-x-2 px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                        <span>Edit Profile</span>
                      </button>
                    ) : (
                      <div className="flex space-x-2">
                        <button
                          onClick={handleCancel}
                          className="px-3 py-2 text-sm border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleUpdate}
                          disabled={updating}
                          className="flex items-center space-x-2 px-3 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-70"
                        >
                          {updating ? (
                            <>
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                              <span>Saving...</span>
                            </>
                          ) : (
                            <>
                              <Save className="w-4 h-4" />
                              <span>Save Changes</span>
                            </>
                          )}
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="space-y-6">
                    {/* Username */}
                    <div className="flex items-start space-x-4">
                      <div className="p-2 bg-gray-100 rounded-lg">
                        <User className="w-5 h-5 text-gray-600" />
                      </div>
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Username
                        </label>
                        {isEditing ? (
                          <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className="w-full max-w-sm px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter username"
                          />
                        ) : (
                          <div className="text-gray-900 font-medium">
                            {user.username || "Not set"}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Email */}
                    <div className="flex items-start space-x-4">
                      <div className="p-2 bg-gray-100 rounded-lg">
                        <Mail className="w-5 h-5 text-gray-600" />
                      </div>
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email
                        </label>
                        <div className="text-gray-900 font-medium">
                          {user.email}
                        </div>
                        <p className="text-gray-500 text-sm mt-1">
                          Your primary email address
                        </p>
                      </div>
                    </div>

                    {/* Position & Department */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Position */}
                        <div className="flex items-start space-x-4">
                        <div className="p-2 bg-gray-100 rounded-lg">
                            <Briefcase className="w-5 h-5 text-gray-600" />
                        </div>
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                            Position
                            </label>
                            {isEditing ? (
                            <input
                                type="text"
                                name="position"
                                value={formData.position}
                                onChange={handleChange}
                                className="w-full max-w-sm px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Enter position"
                            />
                            ) : (
                            <div className="text-gray-900 font-medium">
                                {user.position || "Not set"}
                            </div>
                            )}
                        </div>
                        </div>

                        {/* Department */}
                        <div className="flex items-start space-x-4">
                        <div className="p-2 bg-gray-100 rounded-lg">
                            <Building className="w-5 h-5 text-gray-600" />
                        </div>
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                            Department
                            </label>
                            {isEditing ? (
                            <input
                                type="text"
                                name="department"
                                value={formData.department}
                                onChange={handleChange}
                                className="w-full max-w-sm px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Enter department"
                            />
                            ) : (
                            <div className="text-gray-900 font-medium">
                                {user.department || "Not set"}
                            </div>
                            )}
                        </div>
                        </div>
                    </div>

                    {/* Phone */}
                    <div className="flex items-start space-x-4">
                      <div className="p-2 bg-gray-100 rounded-lg">
                        <Phone className="w-5 h-5 text-gray-600" />
                      </div>
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Phone Number
                        </label>
                        {isEditing ? (
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full max-w-sm px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter phone number"
                          />
                        ) : (
                          <div className="text-gray-900 font-medium">
                            {user.phone || "Not set"}
                          </div>
                        )}
                        <p className="text-gray-500 text-sm mt-1">
                          For important notifications
                        </p>
                      </div>
                    </div>

                    {/* Address */}
                    <div className="flex items-start space-x-4">
                      <div className="p-2 bg-gray-100 rounded-lg">
                        <MapPin className="w-5 h-5 text-gray-600" />
                      </div>
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Address
                        </label>
                        {isEditing ? (
                          <textarea
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            className="w-full max-w-lg px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                            rows={3}
                            placeholder="Enter your address"
                          />
                        ) : (
                          <div className="text-gray-900 font-medium">
                            {user.address || "Not set"}
                          </div>
                        )}
                        <p className="text-gray-500 text-sm mt-1">
                          Your primary location
                        </p>
                      </div>
                    </div>

                    {/* Role & Join Date */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex items-start space-x-4">
                        <div className="p-2 bg-gray-100 rounded-lg">
                          <Shield className="w-5 h-5 text-gray-600" />
                        </div>
                        <div className="flex-1">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Role
                          </label>
                          <span
                            className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                              user.role === "admin"
                                ? "bg-purple-100 text-purple-800"
                                : "bg-blue-100 text-blue-800"
                            }`}
                          >
                            {user.role || "User"}
                          </span>
                          <p className="text-gray-500 text-sm mt-1">
                            Account permissions
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-4">
                        <div className="p-2 bg-gray-100 rounded-lg">
                          <Calendar className="w-5 h-5 text-gray-600" />
                        </div>
                        <div className="flex-1">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Member Since
                          </label>
                          <div className="text-gray-900 font-medium">
                            {/* Assuming we don't track member since in AuthUser yet, or we assume it's there. 
                                It's not in AuthUser, but let's leave it for now or remove. 
                                Actually we didn't add created_at to AuthUser. 
                                Let's assume for now it's not available or we skip formatting.
                                Better yet, let's remove it if it breaks or just hardcode if missing. 
                            */}
                            Not available 
                          </div>
                          <p className="text-gray-500 text-sm mt-1">
                            Account creation date
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "security" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-6">
                    Security Settings
                  </h2>

                  <div className="space-y-4">
                    {/* Change Password */}
                    <div className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <Key className="w-5 h-5 text-gray-600" />
                            <h3 className="font-medium text-gray-900">
                              Change Password
                            </h3>
                          </div>
                          <p className="text-gray-600 text-sm">
                            Update your password to keep your account secure
                          </p>
                        </div>
                        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium px-3 py-1.5">
                          Change
                        </button>
                      </div>
                    </div>

                    {/* Two-Factor Authentication */}
                    <div className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <Smartphone className="w-5 h-5 text-gray-600" />
                            <h3 className="font-medium text-gray-900">
                              Two-Factor Authentication
                            </h3>
                          </div>
                          <p className="text-gray-600 text-sm">
                            Add an extra layer of security to your account
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-gray-500 text-sm">
                            Not enabled
                          </span>
                          <button className="text-blue-600 hover:text-blue-800 text-sm font-medium px-3 py-1.5">
                            Enable
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Active Sessions */}
                    <div className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <Smartphone className="w-5 h-5 text-gray-600" />
                            <h3 className="font-medium text-gray-900">
                              Active Sessions
                            </h3>
                          </div>
                          <p className="text-gray-600 text-sm">
                            Manage devices that are logged into your account
                          </p>
                        </div>
                        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium px-3 py-1.5">
                          Manage
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "preferences" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-6">
                    Notification Preferences
                  </h2>

                  <div className="space-y-6">
                    {/* Email Notifications */}
                    <div>
                      <h3 className="font-medium text-gray-900 mb-4">
                        Email Notifications
                      </h3>
                      <div className="space-y-3">
                        <label className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            className="rounded text-blue-600"
                            defaultChecked
                          />
                          <span className="text-gray-700">Project updates</span>
                        </label>
                        <label className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            className="rounded text-blue-600"
                            defaultChecked
                          />
                          <span className="text-gray-700">New messages</span>
                        </label>
                        <label className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            className="rounded text-blue-600"
                          />
                          <span className="text-gray-700">Weekly reports</span>
                        </label>
                      </div>
                    </div>

                    {/* Push Notifications */}
                    <div>
                      <h3 className="font-medium text-gray-900 mb-4">
                        Push Notifications
                      </h3>
                      <div className="space-y-3">
                        <label className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            className="rounded text-blue-600"
                            defaultChecked
                          />
                          <span className="text-gray-700">
                            Important alerts
                          </span>
                        </label>
                        <label className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            className="rounded text-blue-600"
                          />
                          <span className="text-gray-700">Daily reminders</span>
                        </label>
                        <label className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            className="rounded text-blue-600"
                            defaultChecked
                          />
                          <span className="text-gray-700">
                            Deadline warnings
                          </span>
                        </label>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-gray-200">
                      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                        Save Preferences
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
