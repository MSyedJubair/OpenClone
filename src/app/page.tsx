"use client";

import React, { useState } from "react";
import {
  Sparkles,
  Plus,
  LayoutDashboard,
  FolderKanban,
  Settings,
  Zap,
  Bell,
  ChevronDown,
  Paperclip,
  ArrowUp,
  Globe,
  Clock,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useRouter } from "next/navigation";

const Home = () => {
  const [prompt, setPrompt] = useState("");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const router = useRouter();

  const recentProjects = [
    {
      id: 1,
      name: "SaaS Analytics Dashboard",
      time: "2 hours ago",
      status: "Live",
      url: "analytics-neon.vercel.app",
    },
    {
      id: 2,
      name: "Minimalist Portfolio",
      time: "5 hours ago",
      status: "Draft",
      url: "--",
    },
    {
      id: 3,
      name: "E-commerce Checkout",
      time: "1 day ago",
      status: "Live",
      url: "shop-flow.vercel.app",
    },
  ];

  return (
    <>
      {/* Custom Styles for the Wavy/Blob Background Animation */}
      <style>{`
        @keyframes drift {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-drift {
          animation: drift 15s infinite ease-in-out;
        }
        .animate-drift-slow {
          animation: drift 25s infinite ease-in-out reverse;
        }
      `}</style>

      <div className="flex h-screen bg-[#09090b] text-zinc-100 font-sans overflow-hidden relative z-0">
        {/* Animated Wavy Background */}
        <div className="absolute inset-0 z-[-1] overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/20 blur-[120px] rounded-full animate-drift"></div>
          <div className="absolute bottom-[-10%] right-[-5%] w-[50%] h-[50%] bg-purple-600/10 blur-[150px] rounded-full animate-drift-slow"></div>
        </div>

        {/* Sidebar */}
        <aside
          className={`border-r border-white/10 bg-[#09090b]/80 backdrop-blur-xl flex-col justify-between hidden md:flex transition-all duration-300 ease-in-out ${
            isSidebarCollapsed ? "w-20" : "w-72"
          }`}
        >
          <div>
            <div
              className={`p-6 flex items-center ${isSidebarCollapsed ? "justify-center" : "justify-between"} gap-2`}
            >
              <div className="flex items-center gap-3 cursor-pointer overflow-hidden">
                <div className="bg-linear-to-tr from-indigo-500 to-purple-500 p-2 rounded-xl shrink-0">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                {!isSidebarCollapsed && (
                  <span className="font-semibold text-xl tracking-tight whitespace-nowrap">
                    Lovable<span className="text-white/50">Clone</span>
                  </span>
                )}
              </div>
            </div>

            <nav className="px-4 space-y-2 mt-8">
              <a
                href="#"
                className={`flex items-center ${isSidebarCollapsed ? "justify-center" : "gap-4"} px-3 py-3 bg-white/5 rounded-xl text-sm font-medium text-white transition-colors group`}
              >
                <LayoutDashboard className="w-5 h-5 text-indigo-400 shrink-0" />
                {!isSidebarCollapsed && <span>Overview</span>}
              </a>
              <a
                href="#"
                className={`flex items-center ${isSidebarCollapsed ? "justify-center" : "gap-4"} px-3 py-3 rounded-xl text-sm font-medium text-zinc-400 hover:text-white hover:bg-white/5 transition-colors`}
              >
                <FolderKanban className="w-5 h-5 shrink-0" />
                {!isSidebarCollapsed && <span>Projects</span>}
              </a>
              <a
                href="#"
                className={`flex items-center ${isSidebarCollapsed ? "justify-center" : "gap-4"} px-3 py-3 rounded-xl text-sm font-medium text-zinc-400 hover:text-white hover:bg-white/5 transition-colors`}
              >
                <Globe className="w-5 h-5 shrink-0" />
                {!isSidebarCollapsed && <span>Domains</span>}
              </a>
              <a
                href="#"
                className={`flex items-center ${isSidebarCollapsed ? "justify-center" : "gap-4"} px-3 py-3 rounded-xl text-sm font-medium text-zinc-400 hover:text-white hover:bg-white/5 transition-colors`}
              >
                <Settings className="w-5 h-5 shrink-0" />
                {!isSidebarCollapsed && <span>Settings</span>}
              </a>
            </nav>
          </div>

          <div className="p-4 border-t border-white/10 flex flex-col gap-4">
            <button
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              className="flex items-center justify-end p-2 rounded-lg hover:bg-white/5 text-zinc-500 hover:text-zinc-300 transition-colors"
            >
              {isSidebarCollapsed ? (
                <ChevronRight className="w-5 h-5" />
              ) : (
                <ChevronLeft className="w-5 h-5" />
              )}
            </button>

            <div
              className={`flex items-center ${isSidebarCollapsed ? "justify-center" : "gap-3"} p-2 rounded-xl hover:bg-white/5 cursor-pointer transition-colors`}
            >
              <div className="w-10 h-10 rounded-full bg-indigo-500/20 border border-indigo-500/50 flex items-center justify-center text-indigo-300 font-medium shrink-0">
                JD
              </div>
              {!isSidebarCollapsed && (
                <>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate text-zinc-200">
                      Jane Doe
                    </p>
                    <p className="text-xs text-zinc-500 truncate">Pro Plan</p>
                  </div>
                  <ChevronDown className="w-4 h-4 text-zinc-500" />
                </>
              )}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col relative overflow-y-auto">
          {/* Top Header */}
          <header className="flex items-center justify-between p-8 sticky top-0 z-10 border-b border-transparent">
            <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-full px-5 py-2 text-sm font-medium text-zinc-300 backdrop-blur-md">
              <Zap className="w-4 h-4 text-yellow-500 fill-yellow-500/20" />
              <span>120,400 tokens remaining</span>
            </div>
            <div className="flex items-center gap-6">
              <button className="text-zinc-400 hover:text-white transition-colors">
                <Bell className="w-5 h-5" />
              </button>
              <button className="bg-white text-black px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-zinc-200 hover:scale-105 transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                <Plus className="w-4 h-4" />
                New Project
              </button>
            </div>
          </header>

          <div className="max-w-5xl w-full mx-auto px-8 py-20 flex-1 flex flex-col">
            {/* Hero Prompt Section */}
            <div className="flex flex-col items-center justify-center mt-12 mb-24">
              <h1 className="text-5xl md:text-6xl font-semibold tracking-tight text-center mb-10 leading-tight">
                What do you want to <br />
                <span className="bg-clip-text text-transparent bg-linear-to-tr from-indigo-400 via-purple-400 to-pink-400">
                  build today?
                </span>
              </h1>

              {/* Glowing wrapper for the prompt input */}
              <div className="relative w-full max-w-3xl group">
                <div className="absolute -inset-1 bg-linear-to-tr from-indigo-500 via-purple-500 to-pink-500 rounded-[2rem] blur-lg opacity-20 group-hover:opacity-40 transition duration-500"></div>

                <div className="relative bg-[#18181b]/80 backdrop-blur-xl border border-white/10 rounded-[2rem] p-3 shadow-2xl flex flex-col">
                  <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Describe your app in detail... e.g. 'Build a real estate dashboard with a map view'"
                    className="w-full bg-transparent text-white placeholder-zinc-500 resize-none outline-none p-6 min-h-35 text-xl"
                  />

                  <div className="flex items-center justify-between pt-4 px-3 pb-2 border-t border-white/5">
                    <div className="flex items-center gap-3">
                      <button className="p-2.5 text-zinc-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors">
                        <Paperclip className="w-5 h-5" />
                      </button>
                      <button className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-xl text-sm font-medium text-zinc-300 transition-colors border border-white/5">
                        Model: Claude 3.5 Sonnet{" "}
                        <ChevronDown className="w-4 h-4" />
                      </button>
                    </div>

                    <button
                      className={`p-3 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                        prompt.length > 0
                          ? "bg-white text-black hover:bg-zinc-200 hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                          : "bg-white/10 text-white/30 cursor-not-allowed"
                      }`}
                      onClick={() => {
                        router.push(`/project?prompt=${prompt}`);
                      }}
                    >
                      <ArrowUp className="w-6 h-6" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Quick Suggestions */}
              <div className="flex flex-wrap items-center justify-center gap-4 mt-10">
                {[
                  "Social Network feed",
                  "Landing page for an AI startup",
                  "Task management app",
                  "Crypto tracker",
                ].map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() =>
                      setPrompt(`Build a ${suggestion.toLowerCase()}...`)
                    }
                    className="px-5 py-2.5 rounded-full border border-white/10 bg-white/5 text-sm font-medium text-zinc-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>

            {/* Recent Projects Section */}
            <div className="mt-auto pt-8 border-t border-white/5">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-semibold tracking-tight text-zinc-100">
                  Recent Projects
                </h2>
                <button className="text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors">
                  View all projects
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {recentProjects.map((project) => (
                  <div
                    key={project.id}
                    className="group bg-[#18181b]/60 backdrop-blur-md border border-white/5 hover:border-indigo-500/40 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10_30px_rgba(99,102,241,0.15)] cursor-pointer"
                  >
                    <div className="flex justify-between items-start mb-6">
                      <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-indigo-500/10 transition-colors">
                        <LayoutDashboard className="w-6 h-6 text-zinc-400 group-hover:text-indigo-400 transition-colors" />
                      </div>
                      <button className="text-zinc-500 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity p-1">
                        <MoreVertical className="w-5 h-5" />
                      </button>
                    </div>

                    <h3 className="font-semibold text-lg text-white mb-2 truncate">
                      {project.name}
                    </h3>
                    <div className="flex items-center gap-3 text-sm text-zinc-500 mt-4">
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4" /> {project.time}
                      </span>
                      <span className="w-1.5 h-1.5 rounded-full bg-zinc-600"></span>
                      <span
                        className={`font-medium ${project.status === "Live" ? "text-emerald-400" : "text-amber-400"}`}
                      >
                        {project.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Home;
