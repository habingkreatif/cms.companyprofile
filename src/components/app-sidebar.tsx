"use client";
import { LayoutDashboard } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Boxes, Handshake, Building2, FolderKanban, Users } from "lucide-react";
import { useAuthViewModel } from "@/presentation/hooks/useAuthViewModel";

const menuGroups = [
  {
    label: "Manajemen Konten",
    items: [
      { title: "Project", url: "/project", icon: Boxes },
      { title: "Layanan", url: "/layanan", icon: Handshake },
      { title: "Portofolio", url: "/portofolio", icon: FolderKanban },
      { title: "Tentang Kami", url: "/about-us", icon: Building2 },
    ],
  },
];

export function AppSidebar() {
  const pathname = usePathname();
  const { user } = useAuthViewModel();

  return (
    <Sidebar className="w-64 bg-white border-r border-slate-200 shadow-sm">
      <div className="flex  items-center justify-center py-[15px] border-b border-slate-200">
        <Link href="/admin" className="flex items-center gap-2">
          <Image
            src="/55.png"
            alt="Logo"
            width={32}
            height={32}
            className="rounded-md"
          />
          <span className="text-lg font-semibold text-slate-800">
            HABS Konstruksi Karya
          </span>
        </Link>
      </div>

      <SidebarContent className="px-3 py-4 overflow-y-auto scrollbar-hide">
        <SidebarMenu className="px-1">
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link
                href="/"
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  pathname === "/"
                    ? "bg-blue-50 text-blue-600"
                    : "text-slate-700 hover:bg-slate-50 hover:text-blue-600"
                }`}
              >
                <LayoutDashboard className="w-5 h-5" />
                <span>Dashboard</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>

        {menuGroups.map((group) => (
          <SidebarGroup key={group.label}>
            <SidebarGroupLabel className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              {group.label}
            </SidebarGroupLabel>

            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => {
                  const isActive = pathname.startsWith(item.url);
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <Link
                          href={item.url}
                          className={`flex items-center gap-3 rounded-lg text-sm font-medium transition-colors ${
                            isActive
                              ? "bg-blue-50 text-blue-600"
                              : "text-slate-700 hover:bg-slate-50 hover:text-blue-600"
                          }`}
                        >
                          <item.icon className="w-5 h-5" />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}

        {user?.role === "superadmin" && (
          <SidebarGroup>
            <SidebarGroupLabel className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Super Admin
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link
                      href="/users"
                      className={`flex items-center gap-3 rounded-lg text-sm font-medium transition-colors ${
                        pathname.startsWith("/admin/users")
                          ? "bg-blue-50 text-blue-600"
                          : "text-slate-700 hover:bg-slate-50 hover:text-blue-600"
                      }`}
                    >
                      <Users className="w-5 h-5" />
                      <span>User Management</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>
    </Sidebar>
  );
}
