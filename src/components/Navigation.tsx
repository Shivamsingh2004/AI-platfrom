"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MessageSquare, Image, Code, FileText, Settings, Zap, Menu, X } from "lucide-react";
import { useState } from "react";

const navItems = [
  { href: "/", icon: Zap, label: "Dashboard" },
  { href: "/chat", icon: MessageSquare, label: "AI Chat" },
  { href: "/image", icon: Image, label: "Image Gen" },
  { href: "/code", icon: Code, label: "Code AI" },
  { href: "/tools", icon: FileText, label: "Text Tools" },
  { href: "/settings", icon: Settings, label: "Settings" },
];

export default function Navigation() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  
  return (
    <>
      <button
        className="fixed top-4 left-4 z-50 md:hidden bg-gray-800 p-2 rounded-lg"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle menu"
      >
        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>
      
      <aside className={`
        fixed md:relative inset-y-0 left-0 z-40
        w-64 bg-gray-900 border-r border-gray-800
        flex flex-col transition-transform duration-300
        ${mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
      `}>
        <div className="p-6 border-b border-gray-800">
          <div className="flex items-center gap-2">
            <Zap className="text-blue-400" size={24} />
            <span className="text-lg font-bold text-white">AI Platform</span>
          </div>
          <p className="text-xs text-gray-500 mt-1">Powered by AI</p>
        </div>
        
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map(({ href, icon: Icon, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMobileOpen(false)}
              className={`
                flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium
                transition-colors duration-200
                ${pathname === href
                  ? "bg-blue-600 text-white"
                  : "text-gray-400 hover:text-white hover:bg-gray-800"
                }
              `}
            >
              <Icon size={18} />
              {label}
            </Link>
          ))}
        </nav>
        
        <div className="p-4 border-t border-gray-800">
          <p className="text-xs text-gray-600 text-center">AI Platform v1.0</p>
        </div>
      </aside>
      
      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}
    </>
  );
}
