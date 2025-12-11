"use client";

import { useState, useEffect } from "react";
import { useAuthViewModel } from "@/presentation/hooks/useAuthViewModel";
import { useAboutUs } from "@/presentation/hooks/useAboutUs";
import { useRouter } from "next/navigation";
import {
  Building2,
  Mail,
  Phone,
  MapPin,
  Edit2,
  Save,
  X,
  Loader2,
  Eye,
  Target,
  History as HistoryIcon,
  ImageIcon,
  Users,
  Contact,
  Sparkles,
  Globe,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
} from "lucide-react";
import { AboutUs } from "@/domain/entities/aboutUs";
import { OrgTree } from "@/presentation/components/about-us/OrgTree";
import { motion, AnimatePresence } from "framer-motion";

type TabType = "info" | "organization" | "vision-mission" | "history" | "contact";

const AboutUsPage = () => {
  const { user, loading: authLoading } = useAuthViewModel();
  const { aboutUs, loading: dataLoading, updateAboutUs } = useAboutUs();
  const router = useRouter();
  
  const [activeTab, setActiveTab] = useState<string>("info");
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<AboutUs>({
    companyName: "",
    description: "",
    vision: "",
    mission: "",
    history: "",
    email: "",
    phone: "",
    address: "",
    logoUrl: "",
    organizationStructure: [],
    socialMedia: {},
  });

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (aboutUs) {
      setFormData({
        ...aboutUs,
        organizationStructure: aboutUs.organizationStructure || [],
        socialMedia: aboutUs.socialMedia || {},
      });
    }
  }, [aboutUs]);

  const handleOrgChange = (newStructure: any[]) => {
    setFormData(prev => ({
      ...prev,
      organizationStructure: newStructure
    }));
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };



  const handleSocialMediaChange = (
    platform: keyof NonNullable<AboutUs["socialMedia"]>,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      socialMedia: {
        ...prev.socialMedia,
        [platform]: value,
      },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateAboutUs(formData);
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update About Us:", error);
      alert("Failed to update. Please try again.");
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    if (aboutUs) {
      setFormData({
        ...aboutUs,
        organizationStructure: aboutUs.organizationStructure || [],
        socialMedia: aboutUs.socialMedia || {},
      });
    }
  };

  if (authLoading || (dataLoading && !aboutUs && !isEditing)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600 font-medium">Loading company information...</p>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: "info", label: "Company Info", icon: Building2, gradient: "from-blue-500 to-indigo-500" },
    { id: "organization", label: "Organization", icon: Users, gradient: "from-purple-500 to-indigo-500" },
    { id: "vision-mission", label: "Vision & Mission", icon: Target, gradient: "from-purple-500 to-pink-500" },
    { id: "history", label: "History", icon: HistoryIcon, gradient: "from-amber-500 to-orange-500" },
    { id: "contact", label: "Contact", icon: Contact, gradient: "from-blue-500 to-cyan-500" },
  ];

  return (
    <div className="min-h-screen">
      {/* Header - White Background */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8">
            {/* Logo & Company Info */}
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6 flex-1">
              {/* Logo */}
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="relative group flex-shrink-0"
              >
                <div className="w-24 h-24 rounded-2xl overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all border-2 border-blue-100">
                  {formData.logoUrl ? (
                    <img 
                      src={formData.logoUrl} 
                      alt="Company Logo"
                      className="w-full h-full object-contain p-2"
                    />
                  ) : (
                    <div className="text-center">
                      <Building2 className="w-12 h-12 text-blue-400 mx-auto mb-1" />
                      <span className="text-xs text-gray-500 font-semibold">Logo</span>
                    </div>
                  )}
                </div>
                {isEditing && (
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/60 to-indigo-600/60 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                    <ImageIcon className="w-8 h-8 text-white" />
                  </div>
                )}
              </motion.div>
              
              {/* Company Name & Tagline */}
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
                  {aboutUs?.companyName || "Your Company"}
                </h1>
                <p className="text-lg text-gray-600 mb-4">
                  Share your story, showcase your team, and connect with the world
                </p>
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                  <div className="flex items-center gap-2 bg-blue-50 px-3 py-1.5 rounded-full border border-blue-100">
                    <Building2 className="w-3.5 h-3.5 text-blue-600" />
                    <span className="text-xs font-semibold text-blue-700">Professional</span>
                  </div>
                  <div className="flex items-center gap-2 bg-indigo-50 px-3 py-1.5 rounded-full border border-indigo-100">
                    <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                    <span className="text-xs font-semibold text-indigo-700">Innovative</span>
                  </div>
                  <div className="flex items-center gap-2 bg-purple-50 px-3 py-1.5 rounded-full border border-purple-100">
                    <Users className="w-3.5 h-3.5 text-purple-600" />
                    <span className="text-xs font-semibold text-purple-700">Team-Driven</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Edit Buttons */}
            <div className="flex items-center gap-3 flex-shrink-0">
              {isEditing ? (
                <>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={handleCancel}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl transition-all bg-gray-100 text-gray-700 hover:bg-gray-200 shadow-sm"
                  >
                    <X className="w-4 h-4" />
                    <span className="font-medium">Cancel</span>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    form="about-us-form"
                    disabled={dataLoading}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl transition-all bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-500/30"
                  >
                    {dataLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Save className="w-4 h-4" />
                    )}
                    <span className="font-medium">Save Changes</span>
                  </motion.button>
                </>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl transition-all bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-lg shadow-blue-500/30"
                >
                  <Edit2 className="w-4 h-4" />
                  <span className="font-medium">Edit Profile</span>
                </motion.button>
              )}
            </div>
          </div>
        </div>

        {/* Modern Tabs */}
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-2 overflow-x-auto pb-px scrollbar-hide">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <motion.button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                  className={`relative flex items-center gap-2 px-5 py-3 rounded-t-xl transition-all whitespace-nowrap ${
                    isActive
                      ? "bg-gray-50 text-gray-900 font-semibold"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50/50"
                  }`}
                >
                  <div className={`p-1.5 rounded-lg ${isActive ? `bg-gradient-to-br ${tab.gradient}` : "bg-gray-100"}`}>
                    <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-gray-600"}`} />
                  </div>
                  <span>{tab.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${tab.gradient} rounded-t-full`}
                    />
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <form id="about-us-form" onSubmit={handleSubmit}>
          <AnimatePresence mode="wait">
            {/* Company Info Tab */}
            {activeTab === "info" && (
              <motion.div
                key="info"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {/* About Section - Clean & Minimal */}
                <div className="bg-white rounded-2xl p-8 md:p-10 shadow-sm border border-gray-200">
                  <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <div className="mb-8">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-indigo-500 rounded-lg">
                          <Sparkles className="w-5 h-5 text-white" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900">About Our Company</h2>
                      </div>
                      <p className="text-gray-600">Who we are and what we stand for</p>
                    </div>
                    
                    {/* Content */}
                    {isEditing ? (
                      <div className="space-y-3">
                        <label className="text-sm font-semibold text-gray-700">
                          Company Description
                        </label>
                        <textarea
                          name="description"
                          value={formData.description}
                          onChange={handleInputChange}
                          rows={10}
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none resize-none transition-all text-base leading-relaxed"
                          placeholder="Share your company's story, values, and what makes you stand out..."
                        />
                        <p className="text-sm text-gray-500">
                          Tell your unique story and what sets you apart
                        </p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                        {/* Illustration */}
                        <div className="order-2 lg:order-1">
                          <div className="relative bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl p-8 flex items-center justify-center">
                            {/* SVG Illustration - Team/People */}
                            <svg viewBox="0 0 400 300" className="w-full h-auto max-w-md">
                              {/* Background circles */}
                              <circle cx="200" cy="150" r="120" fill="#EEF2FF" opacity="0.5"/>
                              <circle cx="200" cy="150" r="90" fill="#E0E7FF" opacity="0.5"/>
                              
                              {/* Person 1 - Left */}
                              <g transform="translate(120, 120)">
                                <circle cx="0" cy="0" r="25" fill="#6366F1"/>
                                <ellipse cx="0" cy="50" rx="35" ry="45" fill="#818CF8"/>
                                <circle cx="-8" cy="-5" r="3" fill="white"/>
                                <circle cx="8" cy="-5" r="3" fill="white"/>
                                <path d="M -8 5 Q 0 10 8 5" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round"/>
                              </g>
                              
                              {/* Person 2 - Center */}
                              <g transform="translate(200, 100)">
                                <circle cx="0" cy="0" r="30" fill="#4F46E5"/>
                                <ellipse cx="0" cy="55" rx="40" ry="50" fill="#6366F1"/>
                                <circle cx="-10" cy="-5" r="4" fill="white"/>
                                <circle cx="10" cy="-5" r="4" fill="white"/>
                                <path d="M -10 8 Q 0 13 10 8" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
                              </g>
                              
                              {/* Person 3 - Right */}
                              <g transform="translate(280, 120)">
                                <circle cx="0" cy="0" r="25" fill="#6366F1"/>
                                <ellipse cx="0" cy="50" rx="35" ry="45" fill="#818CF8"/>
                                <circle cx="-8" cy="-5" r="3" fill="white"/>
                                <circle cx="8" cy="-5" r="3" fill="white"/>
                                <path d="M -8 5 Q 0 10 8 5" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round"/>
                              </g>
                              
                              {/* Decorative elements */}
                              <circle cx="80" cy="80" r="8" fill="#C7D2FE" opacity="0.6"/>
                              <circle cx="320" cy="90" r="6" fill="#C7D2FE" opacity="0.6"/>
                              <circle cx="100" cy="220" r="10" fill="#DDD6FE" opacity="0.6"/>
                              <circle cx="300" cy="210" r="7" fill="#DDD6FE" opacity="0.6"/>
                            </svg>
                          </div>
                        </div>
                        
                        {/* Text Content */}
                        <div className="order-1 lg:order-2">
                          {aboutUs?.description ? (
                            <div className="prose prose-lg max-w-none">
                              {aboutUs.description.split('\n\n').map((paragraph, index) => (
                                paragraph.trim() && (
                                  <p key={index} className="text-gray-700 leading-relaxed mb-4 last:mb-0">
                                    {paragraph}
                                  </p>
                                )
                              ))}
                            </div>
                          ) : (
                            <div className="text-center lg:text-left py-8">
                              <p className="text-gray-400 italic text-lg">
                                Your company story awaits to be told...
                              </p>
                              <p className="text-gray-400 text-sm mt-2">
                                Click "Edit Profile" to add your description.
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Organization Tab */}
            {activeTab === "organization" && (
              <motion.div
                key="organization"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative bg-gradient-to-br from-purple-50 via-indigo-50 to-purple-50 rounded-3xl p-10 overflow-hidden">
                  {/* Decorative background */}
                  <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-purple-200/20 to-indigo-200/20 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2" />
                  <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-indigo-200/20 to-purple-200/20 rounded-full blur-3xl translate-y-1/2 translate-x-1/2" />
                  
                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-8">
                      <div className="p-4 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-2xl shadow-lg shadow-purple-500/30">
                        <Users className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                          Organization Structure
                        </h2>
                        <p className="text-sm text-purple-600/70 font-medium">
                          {isEditing ? "✏️ Click to edit • Hover to add/remove positions" : "Meet the people who make it happen"}
                        </p>
                      </div>
                    </div>
                    
                    <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border-2 border-purple-100 min-h-[400px]">
                      <OrgTree
                        data={formData.organizationStructure || []}
                        onChange={handleOrgChange}
                        isEditing={isEditing}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Vision & Mission Tab */}
            {activeTab === "vision-mission" && (
              <motion.div
                key="vision-mission"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-8"
              >
                {/* Vision */}
                <motion.div 
                  whileHover={{ y: -4 }}
                  className="relative bg-gradient-to-br from-purple-50 via-pink-50 to-purple-50 rounded-3xl p-8 overflow-hidden group"
                >
                  {/* Decorative background */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-200/30 to-pink-200/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform duration-500" />
                  
                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="p-4 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl shadow-lg shadow-purple-500/30">
                        <Eye className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                          Our Vision
                        </h2>
                        <p className="text-sm text-purple-600/70 font-medium">Where we're headed and what we dream to achieve</p>
                      </div>
                    </div>
                    
                    {isEditing ? (
                      <textarea
                        name="vision"
                        value={formData.vision}
                        onChange={handleInputChange}
                        rows={8}
                        className="w-full px-5 py-4 bg-white/80 backdrop-blur-sm border-2 border-purple-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none resize-none transition-all shadow-sm"
                        placeholder="Paint a picture of your company's future and the impact you want to make..."
                      />
                    ) : (
                      <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border-2 border-purple-100">
                        <div className="flex gap-3">
                          <div className="text-6xl text-purple-300 font-serif leading-none">&ldquo;</div>
                          <p className="text-gray-800 text-lg leading-relaxed whitespace-pre-wrap flex-1 pt-2">
                            {aboutUs?.vision || "Every great journey begins with a vision..."}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>

                {/* Mission */}
                <motion.div 
                  whileHover={{ y: -4 }}
                  className="relative bg-gradient-to-br from-emerald-50 via-teal-50 to-emerald-50 rounded-3xl p-8 overflow-hidden group"
                >
                  {/* Decorative background */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-emerald-200/30 to-teal-200/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform duration-500" />
                  
                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="p-4 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl shadow-lg shadow-emerald-500/30">
                        <Target className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                          Our Mission
                        </h2>
                        <p className="text-sm text-emerald-600/70 font-medium">Our commitment and the values that drive us forward</p>
                      </div>
                    </div>
                    
                    {isEditing ? (
                      <textarea
                        name="mission"
                        value={formData.mission}
                        onChange={handleInputChange}
                        rows={8}
                        className="w-full px-5 py-4 bg-white/80 backdrop-blur-sm border-2 border-emerald-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none resize-none transition-all shadow-sm"
                        placeholder="Define your purpose, values, and the difference you make every day..."
                      />
                    ) : (
                      <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border-2 border-emerald-100">
                        <div className="flex gap-3">
                          <div className="text-6xl text-emerald-300 font-serif leading-none">&ldquo;</div>
                          <p className="text-gray-800 text-lg leading-relaxed whitespace-pre-wrap flex-1 pt-2">
                            {aboutUs?.mission || "Your mission is the compass that guides your journey..."}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            )}

            {/* History Tab */}
            {activeTab === "history" && (
              <motion.div
                key="history"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div 
                  whileHover={{ y: -4 }}
                  className="relative bg-gradient-to-br from-amber-50 via-orange-50 to-amber-50 rounded-3xl p-10 overflow-hidden"
                >
                  {/* Decorative background */}
                  <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-amber-200/30 to-orange-200/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                  <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-br from-orange-200/30 to-amber-200/30 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
                  
                  <div className="relative z-10 max-w-5xl mx-auto">
                    <div className="flex items-center gap-4 mb-8">
                      <div className="p-4 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl shadow-lg shadow-amber-500/30">
                        <HistoryIcon className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <h2 className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                          Our Journey
                        </h2>
                        <p className="text-sm text-amber-600/70 font-medium">The story of how we got here and where we're going</p>
                      </div>
                    </div>
                    
                    {isEditing ? (
                      <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border-2 border-amber-100">
                        <textarea
                          name="history"
                          value={formData.history}
                          onChange={handleInputChange}
                          rows={12}
                          className="w-full px-5 py-4 bg-white border-2 border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none resize-none transition-all"
                          placeholder="Tell your origin story, celebrate milestones, and share the moments that shaped your company..."
                        />
                      </div>
                    ) : (
                      <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border-2 border-amber-100">
                        <div className="flex gap-4">
                          <div className="text-6xl text-amber-300 font-serif leading-none">📖</div>
                          <div className="flex-1">
                            <p className="text-gray-800 text-lg leading-relaxed whitespace-pre-wrap">
                              {aboutUs?.history || "Every company has a story worth telling..."}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            )}

            {/* Contact Tab */}
            {activeTab === "contact" && (
              <motion.div
                key="contact"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="grid md:grid-cols-2 gap-8"
              >
                {/* Contact Information */}
                <motion.div 
                  whileHover={{ y: -4 }}
                  className="relative bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-50 rounded-3xl p-8 overflow-hidden"
                >
                  {/* Decorative background */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-200/30 to-cyan-200/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                  
                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-8">
                      <div className="p-4 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl shadow-lg shadow-blue-500/30">
                        <Contact className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                          Get in Touch
                        </h2>
                        <p className="text-sm text-blue-600/70 font-medium">We'd love to hear from you</p>
                      </div>
                    </div>
                    
                    <div className="space-y-6">
                      {/* Email */}
                      <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-5 border-2 border-blue-100">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="p-2.5 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl">
                            <Mail className="w-5 h-5 text-white" />
                          </div>
                          <label className="text-sm font-bold text-gray-700 uppercase tracking-wide">Email</label>
                        </div>
                        {isEditing ? (
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-white border-2 border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                            placeholder="hello@yourcompany.com"
                          />
                        ) : (
                          <a
                            href={`mailto:${aboutUs?.email}`}
                            className="text-blue-600 hover:text-blue-700 font-semibold text-lg block"
                          >
                            {aboutUs?.email || "Not set"}
                          </a>
                        )}
                      </div>

                      {/* Phone */}
                      <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-5 border-2 border-emerald-100">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="p-2.5 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl">
                            <Phone className="w-5 h-5 text-white" />
                          </div>
                          <label className="text-sm font-bold text-gray-700 uppercase tracking-wide">Phone</label>
                        </div>
                        {isEditing ? (
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 bg-white border-2 border-emerald-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                            placeholder="+62 xxx xxxx xxxx"
                          />
                        ) : (
                          <p className="text-gray-800 font-semibold text-lg">{aboutUs?.phone || "Not set"}</p>
                        )}
                      </div>

                      {/* Address */}
                      <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-5 border-2 border-red-100">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="p-2.5 bg-gradient-to-br from-red-500 to-rose-500 rounded-xl">
                            <MapPin className="w-5 h-5 text-white" />
                          </div>
                          <label className="text-sm font-bold text-gray-700 uppercase tracking-wide">Address</label>
                        </div>
                        {isEditing ? (
                          <textarea
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            rows={3}
                            className="w-full px-4 py-3 bg-white border-2 border-red-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none resize-none transition-all"
                            placeholder="Your office address, city, postal code..."
                          />
                        ) : (
                          <p className="text-gray-700 leading-relaxed">
                            {aboutUs?.address || "Not set"}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Social Media */}
                <motion.div 
                  whileHover={{ y: -4 }}
                  className="relative bg-gradient-to-br from-rose-50 via-pink-50 to-rose-50 rounded-3xl p-8 overflow-hidden"
                >
                  {/* Decorative background */}
                  <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-rose-200/30 to-pink-200/30 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2" />
                  
                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-8">
                      <div className="p-4 bg-gradient-to-br from-rose-500 to-pink-500 rounded-2xl shadow-lg shadow-rose-500/30">
                        <Globe className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <h2 className="text-3xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                          Social Media
                        </h2>
                        <p className="text-sm text-rose-600/70 font-medium">Follow our journey across social platforms</p>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      {[
                        { key: "website", icon: Globe, color: "from-gray-500 to-slate-500", bgColor: "bg-gray-100", placeholder: "https://mysite.com", label: "Website" },
                        { key: "facebook", icon: Facebook, color: "from-blue-600 to-blue-700", bgColor: "bg-blue-100", placeholder: "Facebook URL", label: "Facebook" },
                        { key: "instagram", icon: Instagram, color: "from-pink-600 to-rose-600", bgColor: "bg-pink-100", placeholder: "Instagram URL", label: "Instagram" },
                        { key: "linkedin", icon: Linkedin, color: "from-blue-700 to-indigo-700", bgColor: "bg-blue-100", placeholder: "LinkedIn URL", label: "LinkedIn" },
                        { key: "twitter", icon: Twitter, color: "from-sky-500 to-blue-500", bgColor: "bg-sky-100", placeholder: "Twitter/X URL", label: "Twitter" },
                      ].map((social) => (
                        <div key={social.key} className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border-2 border-rose-100">
                          <div className="flex items-center gap-3">
                            <div className={`p-2.5 bg-gradient-to-br ${social.color} rounded-xl shadow-sm`}>
                              <social.icon className="w-5 h-5 text-white" />
                            </div>
                            <div className="flex-1">
                              <label className="text-xs font-bold text-gray-600 uppercase tracking-wide block mb-1">
                                {social.label}
                              </label>
                              {isEditing ? (
                                <input
                                  type="text"
                                  value={(formData.socialMedia as any)?.[social.key] || ""}
                                  onChange={(e) => handleSocialMediaChange(social.key as any, e.target.value)}
                                  className="w-full px-3 py-2 bg-white border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-rose-500 outline-none transition-all text-sm"
                                  placeholder={social.placeholder}
                                />
                              ) : (
                                (aboutUs?.socialMedia as any)?.[social.key] ? (
                                  <a
                                    href={(aboutUs?.socialMedia as any)?.[social.key]}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-gray-700 hover:text-rose-600 truncate font-medium block"
                                  >
                                    {(aboutUs?.socialMedia as any)?.[social.key]}
                                  </a>
                                ) : (
                                  <span className="text-sm text-gray-400">Not set</span>
                                )
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </div>
    </div>
  );
};

export default AboutUsPage;
