"use client";

import { motion } from "framer-motion";
import {
  Users,
  TrendingUp,
  DollarSign,
  FileText,
  Calendar,
  Briefcase,
  Clock,
  ChevronRight,
  Plus,
  Filter,
  Download,
  MoreVertical,
  BarChart3,
  CheckCircle2,
  AlertTriangle,
  CalendarDays,
  Bell,
  Settings,
  Search,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthViewModel } from "@/presentation/hooks/useAuthViewModel";

const DashboardPage = () => {
   const { user, loading } = useAuthViewModel();
  const router = useRouter();
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<"overview" | "projects" | "tasks">(
    "overview"
  );

  useEffect(() => {
    if (!loading && !user) {
      router.push("/admin/login");
    }
  }, [user, loading, router]);

  const stats = [
    {
      title: "Total Projects",
      value: "24",
      change: "+12%",
      icon: <Briefcase className="w-4 h-4" />,
      color: "text-blue-500",
      bgColor: "bg-blue-50",
      trend: "up",
    },
    {
      title: "Today's Progress",
      value: "87%",
      change: "+5%",
      icon: <TrendingUp className="w-4 h-4" />,
      color: "text-emerald-500",
      bgColor: "bg-emerald-50",
      trend: "up",
    },
    {
      title: "Budget",
      value: "Rp 4.2M",
      change: "-2%",
      icon: <DollarSign className="w-4 h-4" />,
      color: "text-amber-500",
      bgColor: "bg-amber-50",
      trend: "down",
    },
    {
      title: "Team Members",
      value: "156",
      change: "+8%",
      icon: <Users className="w-4 h-4" />,
      color: "text-purple-500",
      bgColor: "bg-purple-50",
      trend: "up",
    },
  ];

  const recentProjects = [
    {
      id: 1,
      name: "Office Building A",
      progress: 85,
      status: "On Track",
      deadline: "Dec 15, 2024",
      budget: "Rp 1.2B",
      team: "15 members",
      color: "bg-emerald-500",
      priority: "high",
    },
    {
      id: 2,
      name: "Highway Bridge B",
      progress: 65,
      status: "Delayed",
      deadline: "Jan 20, 2025",
      budget: "Rp 2.8B",
      team: "32 members",
      color: "bg-amber-500",
      priority: "medium",
    },
    {
      id: 3,
      name: "Apartment Complex C",
      progress: 92,
      status: "Completed",
      deadline: "Dec 5, 2024",
      budget: "Rp 850M",
      team: "24 members",
      color: "bg-blue-500",
      priority: "low",
    },
  ];

  const upcomingTasks = [
    {
      id: 1,
      task: "Contractor Meeting",
      time: "09:00 AM",
      priority: "high",
      location: "Meeting Room 1",
      duration: "1h",
    },
    {
      id: 2,
      task: "Site Inspection",
      time: "11:00 AM",
      priority: "medium",
      location: "Building A Site",
      duration: "2h",
    },
    {
      id: 3,
      task: "Budget Review",
      time: "02:00 PM",
      priority: "high",
      location: "Main Office",
      duration: "1.5h",
    },
  ];

  const quickActions = [
    {
      icon: <FileText className="w-5 h-5" />,
      label: "New Report",
      description: "Generate project report",
      color: "hover:bg-blue-50 hover:text-blue-600",
    },
    {
      icon: <Briefcase className="w-5 h-5" />,
      label: "Add Project",
      description: "Create new project",
      color: "hover:bg-emerald-50 hover:text-emerald-600",
    },
    {
      icon: <Users className="w-5 h-5" />,
      label: "Manage Team",
      description: "Add team members",
      color: "hover:bg-purple-50 hover:text-purple-600",
    },
    {
      icon: <CalendarDays className="w-5 h-5" />,
      label: "Schedule",
      description: "Plan activities",
      color: "hover:bg-amber-50 hover:text-amber-600",
    },
  ];

 

  return (
    <div className="min-h-screen">
      <div className="top-0 z-10 bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
            <p className="text-sm text-gray-600 mt-1">
              Welcome back, {user?.username} !
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex space-x-6 mt-6 border-b border-gray-200">
          {["overview", "projects", "tasks", "reports"].map((tab) => (
            <button
              key={tab}
              onClick={() =>
                setActiveTab(tab as "overview" | "projects" | "tasks")
              }
              className={`pb-3 px-1 text-sm font-medium capitalize transition-colors ${
                activeTab === tab
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="px-6 py-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <div className={stat.color}>{stat.icon}</div>
                </div>
                <span
                  className={`text-xs font-medium px-2 py-1 rounded-full ${
                    stat.trend === "up"
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-red-50 text-red-700"
                  }`}
                >
                  {stat.change}
                </span>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">
                {stat.value}
              </h3>
              <p className="text-sm text-gray-600">{stat.title}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Active Projects
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      3 projects need attention
                    </p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900 px-3 py-2 rounded-lg hover:bg-gray-50">
                      <Filter className="w-4 h-4" />
                      <span>Filter</span>
                    </button>
                    <button className="flex items-center space-x-2 bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors">
                      <Plus className="w-4 h-4" />
                      <span className="text-sm">Add Project</span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="space-y-4">
                  {recentProjects.map((project) => (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={`flex items-center justify-between p-4 rounded-lg border transition-all ${
                        selectedProject === project.id
                          ? "border-blue-300 bg-blue-50"
                          : "border-gray-100 hover:border-gray-300 hover:bg-gray-50"
                      }`}
                      onClick={() => setSelectedProject(project.id)}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          <div
                            className={`w-3 h-3 rounded-full ${project.color}`}
                          />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">
                            {project.name}
                          </h4>
                          <div className="flex items-center space-x-3 mt-1">
                            <span className="text-xs text-gray-600">
                              {project.team}
                            </span>
                            <span className="text-xs text-gray-400">•</span>
                            <span className="text-xs text-gray-600">
                              {project.budget}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-6">
                        <div className="text-right">
                          <div className="text-sm font-semibold text-gray-900">
                            {project.progress}%
                          </div>
                          <div className="text-xs text-gray-600">
                            {project.deadline}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span
                            className={`text-xs px-2 py-1 rounded-full ${
                              project.priority === "high"
                                ? "bg-red-50 text-red-700"
                                : project.priority === "medium"
                                ? "bg-amber-50 text-amber-700"
                                : "bg-blue-50 text-blue-700"
                            }`}
                          >
                            {project.priority}
                          </span>
                          <ChevronRight className="w-4 h-4 text-gray-400" />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <button className="w-full mt-6 text-center text-blue-600 hover:text-blue-800 text-sm font-medium py-3 border-t border-gray-100">
                  View All Projects{" "}
                  <ChevronRight className="w-4 h-4 inline ml-1" />
                </button>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Quick Actions
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    className="flex flex-col items-center p-4 bg-white rounded-xl border border-gray-100 hover:border-blue-200 hover:shadow-sm transition-all group"
                  >
                    <div
                      className={`p-3 rounded-lg mb-3 text-gray-600 group-hover:scale-110 transition-transform ${action.color}`}
                    >
                      {action.icon}
                    </div>
                    <div className="text-center">
                      <div className="font-medium text-gray-900 mb-1">
                        {action.label}
                      </div>
                      <div className="text-xs text-gray-500">
                        {action.description}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Today&apos;s Schedule
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {upcomingTasks.length} appointments
                    </p>
                  </div>
                  <Calendar className="w-5 h-5 text-gray-400" />
                </div>
              </div>

              <div className="p-6">
                <div className="space-y-4">
                  {upcomingTasks.map((task) => (
                    <div
                      key={task.id}
                      className="p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="font-medium text-gray-900 mb-1">
                            {task.task}
                          </div>
                          <div className="text-xs text-gray-600">
                            {task.time} • {task.location}
                          </div>
                        </div>
                        <div className="flex flex-col items-end">
                          <span className="text-xs font-medium text-gray-900">
                            {task.duration}
                          </span>
                          <span
                            className={`text-xs px-2 py-1 rounded-full mt-1 ${
                              task.priority === "high"
                                ? "bg-red-50 text-red-700"
                                : "bg-amber-50 text-amber-700"
                            }`}
                          >
                            {task.priority}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <button className="w-full mt-4 text-center text-blue-600 hover:text-blue-800 text-sm font-medium py-2">
                  View Calendar <ChevronRight className="w-4 h-4 inline ml-1" />
                </button>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between mb-4">
                <BarChart3 className="w-6 h-6" />
                <MoreVertical className="w-5 h-5 text-white/70" />
              </div>
              <h4 className="text-lg font-semibold mb-2">Monthly Report</h4>
              <p className="text-blue-100 text-sm mb-6">
                Download the latest project performance report
              </p>
              <button className="w-full flex items-center justify-center space-x-2 bg-white text-blue-700 hover:bg-gray-100 px-4 py-3 rounded-lg transition-colors font-medium">
                <Download className="w-4 h-4" />
                <span>Export Report</span>
              </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Progress Summary
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>On Track</span>
                    <span className="font-medium">65%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 w-[65%]"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Delayed</span>
                    <span className="font-medium">22%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-500 w-[22%]"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Completed</span>
                    <span className="font-medium">13%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 w-[13%]"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
