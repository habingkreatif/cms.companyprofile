"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Settings,
  Save,
  Bell,
  Globe,
  Shield,
  Database,
  Palette,
  Moon,
  Sun,
  Download,
  Upload,
  Clock,
  Eye,
  EyeOff,
  CheckCircle,
  ChevronRight,
} from "lucide-react";

// Component definitions moved outside of main component
const GeneralSettings = ({
  autoSave,
  setAutoSave,
}: {
  autoSave: boolean;
  setAutoSave: (value: boolean) => void;
}) => (
  <div className="space-y-6">
    {/* Company Information */}
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Company Information
      </h3>
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Company Name
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="HABS Konstruksi Karya"
              defaultValue="HABS Konstruksi Karya"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Industry
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Construction"
              defaultValue="Construction"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Company Address
          </label>
          <textarea
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            rows={3}
            placeholder="Enter company address"
            defaultValue="Jl. Construction No. 123, Jakarta"
          />
        </div>
      </div>
    </div>

    {/* System Preferences */}
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        System Preferences
      </h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-gray-900">Auto-save</p>
            <p className="text-sm text-gray-600">Automatically save changes</p>
          </div>
          <ToggleSwitch checked={autoSave} onChange={setAutoSave} />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-gray-900">Show Tooltips</p>
            <p className="text-sm text-gray-600">
              Display helpful hints and tips
            </p>
          </div>
          <ToggleSwitch checked={true} onChange={() => {}} />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Default Time Zone
          </label>
          <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Asia/Jakarta (GMT+7)</option>
            <option>Asia/Singapore (GMT+8)</option>
            <option>Asia/Tokyo (GMT+9)</option>
          </select>
        </div>
      </div>
    </div>
  </div>
);

const NotificationSettings = ({
  emailNotifications,
  setEmailNotifications,
  pushNotifications,
  setPushNotifications,
}: {
  emailNotifications: any;
  setEmailNotifications: (value: any) => void;
  pushNotifications: any;
  setPushNotifications: (value: any) => void;
}) => (
  <div className="space-y-6">
    {/* Email Notifications */}
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Email Notifications
      </h3>
      <div className="space-y-4">
        {Object.entries(emailNotifications).map(([key, value]) => (
          <div key={key} className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">
                {key
                  .replace(/([A-Z])/g, " $1")
                  .replace(/^./, (str) => str.toUpperCase())}
              </p>
              <p className="text-sm text-gray-600">
                Receive email notifications for {key.toLowerCase()}
              </p>
            </div>
            <ToggleSwitch
              checked={value as boolean}
              onChange={(checked) =>
                setEmailNotifications((prev: any) => ({
                  ...prev,
                  [key]: checked,
                }))
              }
            />
          </div>
        ))}
      </div>
    </div>

    {/* Push Notifications */}
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Push Notifications
      </h3>
      <div className="space-y-4">
        {Object.entries(pushNotifications).map(([key, value]) => (
          <div key={key} className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">
                {key
                  .replace(/([A-Z])/g, " $1")
                  .replace(/^./, (str) => str.toUpperCase())}
              </p>
              <p className="text-sm text-gray-600">
                Show push notifications for {key.toLowerCase()}
              </p>
            </div>
            <ToggleSwitch
              checked={value as boolean}
              onChange={(checked) =>
                setPushNotifications((prev: any) => ({
                  ...prev,
                  [key]: checked,
                }))
              }
            />
          </div>
        ))}
      </div>
    </div>

    {/* Notification Schedule */}
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Notification Schedule
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Quiet Hours Start
          </label>
          <input
            type="time"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            defaultValue="22:00"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Quiet Hours End
          </label>
          <input
            type="time"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            defaultValue="06:00"
          />
        </div>
      </div>
    </div>
  </div>
);

const AppearanceSettings = ({
  darkMode,
  setDarkMode,
}: {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
}) => (
  <div className="space-y-6">
    {/* Theme */}
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Theme Settings
      </h3>
      <div className="space-y-6">
        {/* Dark Mode Toggle */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {darkMode ? (
              <Moon className="w-5 h-5 text-gray-600" />
            ) : (
              <Sun className="w-5 h-5 text-gray-600" />
            )}
            <div>
              <p className="font-medium text-gray-900">
                {darkMode ? "Dark Mode" : "Light Mode"}
              </p>
              <p className="text-sm text-gray-600">
                {darkMode ? "Switch to light theme" : "Switch to dark theme"}
              </p>
            </div>
          </div>
          <ToggleSwitch checked={darkMode} onChange={setDarkMode} />
        </div>

        {/* Color Scheme */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Color Scheme
          </label>
          <div className="grid grid-cols-4 gap-3">
            {[
              { name: "Blue", color: "bg-blue-600", border: "border-blue-600" },
              {
                name: "Green",
                color: "bg-emerald-600",
                border: "border-emerald-600",
              },
              {
                name: "Purple",
                color: "bg-purple-600",
                border: "border-purple-600",
              },
              {
                name: "Orange",
                color: "bg-orange-600",
                border: "border-orange-600",
              },
            ].map((scheme) => (
              <button
                key={scheme.name}
                className={`flex flex-col items-center space-y-2 p-3 rounded-lg border-2 ${scheme.border}`}
              >
                <div className={`w-8 h-8 rounded-full ${scheme.color}`}></div>
                <span className="text-sm font-medium">{scheme.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Font Size */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Font Size
          </label>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">Small</span>
            <input
              type="range"
              min="12"
              max="18"
              defaultValue="14"
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <span className="text-sm text-gray-600">Large</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const SecuritySettings = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="space-y-6">
      {/* Password */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Password Security
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Current Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter current password"
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                New Password
              </label>
              <input
                type="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter new password"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Confirm new password"
              />
            </div>
          </div>

          <div className="pt-2">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Update Password
            </button>
          </div>
        </div>
      </div>

      {/* Two-Factor Authentication */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Two-Factor Authentication
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Enable 2FA</p>
              <p className="text-sm text-gray-600">
                Add an extra layer of security to your account
              </p>
            </div>
            <ToggleSwitch checked={false} onChange={() => {}} />
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">
              Two-factor authentication adds an additional layer of security to
              your account by requiring more than just a password to sign in.
            </p>
          </div>
        </div>
      </div>

      {/* Session Management */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Active Sessions
        </h3>
        <div className="space-y-3">
          {[
            {
              device: "Chrome on Windows",
              location: "Jakarta, Indonesia",
              lastActive: "Now",
              current: true,
            },
            {
              device: "Safari on iPhone",
              location: "Bandung, Indonesia",
              lastActive: "2 hours ago",
              current: false,
            },
            {
              device: "Firefox on Mac",
              location: "Surabaya, Indonesia",
              lastActive: "Yesterday",
              current: false,
            },
          ].map((session, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
            >
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <Globe className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{session.device}</p>
                  <div className="flex items-center space-x-2">
                    <p className="text-sm text-gray-600">{session.location}</p>
                    {session.current && (
                      <span className="px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded-full">
                        Current
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">{session.lastActive}</p>
                {!session.current && (
                  <button className="text-red-600 hover:text-red-800 text-sm font-medium">
                    Logout
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const DataSettings = ({
  dataRetention,
  setDataRetention,
  handleExportData,
  handleImportData,
  handleResetSettings,
}: {
  dataRetention: string;
  setDataRetention: (value: string) => void;
  handleExportData: () => void;
  handleImportData: () => void;
  handleResetSettings: () => void;
}) => (
  <div className="space-y-6">
    {/* Data Retention */}
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Data Retention
      </h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Keep Data For
          </label>
          <select
            value={dataRetention}
            onChange={(e) => setDataRetention(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="30">30 days</option>
            <option value="60">60 days</option>
            <option value="90">90 days</option>
            <option value="180">180 days</option>
            <option value="365">1 year</option>
            <option value="forever">Forever</option>
          </select>
          <p className="text-sm text-gray-600 mt-2">
            Old data will be automatically deleted after this period.
          </p>
        </div>
      </div>
    </div>

    {/* Export & Import */}
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Data Management
      </h3>
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={handleExportData}
            className="flex items-center justify-center space-x-2 p-4 border border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
          >
            <Download className="w-5 h-5 text-gray-600" />
            <div className="text-left">
              <p className="font-medium text-gray-900">Export Data</p>
              <p className="text-sm text-gray-600">Download your data as CSV</p>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>

          <button
            onClick={handleImportData}
            className="flex items-center justify-center space-x-2 p-4 border border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
          >
            <Upload className="w-5 h-5 text-gray-600" />
            <div className="text-left">
              <p className="font-medium text-gray-900">Import Data</p>
              <p className="text-sm text-gray-600">Upload data from CSV file</p>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
        </div>
      </div>
    </div>

    {/* Danger Zone */}
    <div className="bg-white rounded-lg border border-red-200 p-6">
      <h3 className="text-lg font-semibold text-red-700 mb-4">Danger Zone</h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-gray-900">Reset All Settings</p>
            <p className="text-sm text-gray-600">
              Restore all settings to default values
            </p>
          </div>
          <button
            onClick={handleResetSettings}
            className="px-4 py-2 border border-red-600 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
          >
            Reset
          </button>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-gray-900">Delete Account</p>
            <p className="text-sm text-gray-600">
              Permanently delete your account and all data
            </p>
          </div>
          <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
);

// Reusable Toggle Switch Component
const ToggleSwitch = ({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
}) => (
  <label className="relative inline-flex items-center cursor-pointer">
    <input
      type="checkbox"
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
      className="sr-only peer"
    />
    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
  </label>
);

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState("general");
  const [darkMode, setDarkMode] = useState(false);
  const [autoSave, setAutoSave] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState({
    projectUpdates: true,
    newMessages: true,
    weeklyReports: false,
    systemAlerts: true,
  });
  const [pushNotifications, setPushNotifications] = useState({
    importantAlerts: true,
    dailyReminders: false,
    deadlineWarnings: true,
  });
  const [dataRetention, setDataRetention] = useState("90");
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saving, setSaving] = useState(false);

  const tabs = [
    { id: "general", label: "General", icon: <Settings className="w-4 h-4" /> },
    {
      id: "notifications",
      label: "Notifications",
      icon: <Bell className="w-4 h-4" />,
    },
    {
      id: "appearance",
      label: "Appearance",
      icon: <Palette className="w-4 h-4" />,
    },
    { id: "security", label: "Security", icon: <Shield className="w-4 h-4" /> },
    { id: "data", label: "Data", icon: <Database className="w-4 h-4" /> },
  ];

  const handleSaveSettings = async () => {
    setSaving(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSaving(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleExportData = () => {
    alert("Data exported successfully!");
  };

  const handleImportData = () => {
    alert("Please select file to import...");
  };

  const handleResetSettings = () => {
    if (confirm("Are you sure you want to reset all settings to default?")) {
      alert("Settings reset to default!");
    }
  };

  return (
    <div className="min-h-screen">
      {/* Success Toast */}
      {saveSuccess && (
        <div className="fixed top-4 right-4 z-50">
          <div className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-sm flex items-center space-x-2">
            <CheckCircle className="w-4 h-4" />
            <span className="text-sm font-medium">
              Settings saved successfully!
            </span>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
          <p className="text-gray-600 mt-1">
            Manage your application preferences and account settings
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left sidebar - Tabs */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 top-24">
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

              {/* Save Button */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <button
                  onClick={handleSaveSettings}
                  disabled={saving}
                  className="w-full flex items-center justify-center space-x-2 px-3 py-2.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-70"
                >
                  {saving ? (
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
            </div>
          </div>

          {/* Main content */}
          <div className="lg:col-span-3">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === "general" && (
                <GeneralSettings
                  autoSave={autoSave}
                  setAutoSave={setAutoSave}
                />
              )}
              {activeTab === "notifications" && (
                <NotificationSettings
                  emailNotifications={emailNotifications}
                  setEmailNotifications={setEmailNotifications}
                  pushNotifications={pushNotifications}
                  setPushNotifications={setPushNotifications}
                />
              )}
              {activeTab === "appearance" && (
                <AppearanceSettings
                  darkMode={darkMode}
                  setDarkMode={setDarkMode}
                />
              )}
              {activeTab === "security" && <SecuritySettings />}
              {activeTab === "data" && (
                <DataSettings
                  dataRetention={dataRetention}
                  setDataRetention={setDataRetention}
                  handleExportData={handleExportData}
                  handleImportData={handleImportData}
                  handleResetSettings={handleResetSettings}
                />
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
