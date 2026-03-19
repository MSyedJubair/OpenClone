"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
  SandpackFileExplorer,
} from "@codesandbox/sandpack-react";
import { autocompletion } from "@codemirror/autocomplete";
import {
  Code,
  Play,
  Send,
  Zap,
  ChevronLeft,
  ChevronRight,
  Plus,
  Sparkles,
  Rocket,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { useParams } from "next/navigation";

export default function LovableClone() {
  const [isChatOpen, setIsChatOpen] = useState(true);
  const [isEditorVisible, setIsEditorVisible] = useState(false);
  const [chatInput, setChatInput] = useState("");

  // Resizing State
  const [chatWidth, setChatWidth] = useState(400);
  const [isResizing, setIsResizing] = useState(false);
  const sidebarRef = useRef(null);

  const { projectId } = useParams();
  console.log("projectId:", projectId);

  const trpc = useTRPC();
  const { data: project, isLoading } = useQuery(
    trpc.project.getProject.queryOptions(
      { projectId: Number(projectId) },
      { enabled: !!projectId && !isNaN(projectId) },
    ),
  );

  const [files, setFiles] = useState({
    "/App.js": `export default function App() {
        return (
          <div>Hello World</div>
        )
      }`,
  });
  const [prevProjectId, setPrevProjectId] = useState<number>();

  // 3. Sync during render
  if (project && project.id !== prevProjectId) {
    setPrevProjectId(project.id);
    setFiles(project.files);
  }

  // Resizing Logic
  const startResizing = useCallback((e) => {
    setIsResizing(true);
  }, []);

  const stopResizing = useCallback(() => {
    setIsResizing(false);
  }, []);

  const resize = useCallback(
    (e) => {
      if (isResizing) {
        // Limit min width to 280 and max to 600
        const newWidth = Math.min(Math.max(280, e.clientX), 800);
        setChatWidth(newWidth);
      }
    },
    [isResizing],
  );

  useEffect(() => {
    window.addEventListener("mousemove", resize);
    window.addEventListener("mouseup", stopResizing);
    return () => {
      window.removeEventListener("mousemove", resize);
      window.removeEventListener("mouseup", stopResizing);
    };
  }, [resize, stopResizing]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    setChatInput("");
  };

  return (
    <div
      className={`flex h-screen w-full bg-app-bg text-zinc-300 overflow-hidden selection:bg-indigo-500/30 font-sans ${isResizing ? "cursor-col-resize select-none" : ""}`}
    >
      <style>{`
        @keyframes drift {
          0% { transform: translate(0px, 0px) scale(1) }
          33% { transform: translate(30px, -50px) scale(1.1) }
          66% { transform: translate(-20px, 20px) scale(0.9) }
          100% { transform: translate(0px, 0px) scale(1) }
        }
        .animate-drift { animation: drift 15s infinite ease-in-out }
        .animate-drift-slow { animation: drift 25s infinite ease-in-out reverse }
      `}</style>

      {/* Background Ambient Blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-indigo-500/10 rounded-full blur-[120px] animate-drift" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-purple-500/10 rounded-full blur-[120px] animate-drift-slow" />
      </div>

      {/* LEFT: Resizable & Collapsible Chat Panel */}
      <aside
        ref={sidebarRef}
        style={{ width: isChatOpen ? `${chatWidth}px` : "0px" }}
        className={`relative flex flex-col bg-app-surface/80 backdrop-blur-xl border-r border-white/5 transition-[width] duration-300 ease-in-out z-20 ${
          isResizing ? "transition-none" : ""
        }`}
      >
        <div
          className="flex flex-col h-full overflow-hidden"
          style={{ width: `${chatWidth}px` }}
        >
          <header className="p-6 border-b border-white/5 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-linear-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                <Zap size={16} className="text-white fill-current" />
              </div>
              <span className="font-bold text-sm tracking-tight text-white block">
                lovable.ai
              </span>
            </div>
            <button className="p-2 hover:bg-white/5 rounded-lg transition-colors text-zinc-400 hover:text-white">
              <Plus size={20} />
            </button>
          </header>

          <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-xl bg-linear-to-b from-zinc-800 to-zinc-900 border border-white/10 flex items-center justify-center shrink-0">
                <Sparkles size={14} className="text-indigo-400" />
              </div>
              <div className="text-[14px] leading-relaxed text-zinc-300">
                The sidebar is now resizable! Hover over the right edge to drag,
                or use the toggle to collapse.
              </div>
            </div>
          </div>

          <footer className="p-6 bg-transparent shrink-0">
            <form onSubmit={handleSendMessage} className="relative group">
              <textarea
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Describe your next feature..."
                className="w-full bg-zinc-950/50 border border-white/10 rounded-2xl p-4 pr-14 text-[14px] focus:outline-none focus:ring-2 focus:ring-indigo-500/40 resize-none h-32 transition-all shadow-2xl"
              />
              <button
                type="submit"
                className="absolute right-3 bottom-3 p-2.5 bg-white text-black hover:bg-zinc-200 rounded-xl transition-all shadow-lg active:scale-90"
              >
                <Send size={16} />
              </button>
            </form>
          </footer>
        </div>

        {/* Resize Handle (The invisible area that triggers dragging) */}
        {isChatOpen && (
          <div
            onMouseDown={startResizing}
            className={`absolute -right-1 top-0 w-2 h-full cursor-col-resize z-30 group transition-colors ${isResizing ? "bg-indigo-500/50" : "hover:bg-indigo-500/30"}`}
          >
            {/* Visual indicator line */}
            <div
              className={`absolute left-1/2 -translate-x-1/2 w-px h-full transition-colors ${isResizing ? "bg-indigo-400" : "group-hover:bg-indigo-400/50"}`}
            />
          </div>
        )}

        {/* Collapse Toggle Button */}
        <button
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-14 bg-app-surface border border-white/10 rounded-full flex items-center justify-center hover:text-white hover:border-indigo-500/50 transition-all z-50 shadow-2xl"
        >
          {isChatOpen ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
        </button>
      </aside>

      {/* RIGHT: Preview & Code Panel */}
      <main className="flex-1 flex flex-col min-w-0 bg-app-bg relative z-10">
        <header className="h-16 border-b border-white/5 flex items-center justify-between px-8 bg-app-bg/50 backdrop-blur-md">
          <div className="flex bg-zinc-950 p-1 rounded-xl border border-white/5">
            <button
              onClick={() => setIsEditorVisible(false)}
              className={`flex items-center gap-2 px-5 py-2 text-[13px] font-bold rounded-lg transition-all ${
                !isEditorVisible
                  ? "bg-zinc-800 text-white shadow-lg"
                  : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              <Play size={14} /> Preview
            </button>
            <button
              onClick={() => setIsEditorVisible(true)}
              className={`flex items-center gap-2 px-5 py-2 text-[13px] font-bold rounded-lg transition-all ${
                isEditorVisible
                  ? "bg-zinc-800 text-white shadow-lg"
                  : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              <Code size={14} /> Code
            </button>
          </div>
          <button className="flex items-center gap-2 px-6 py-2.5 bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-xl text-[13px] font-bold transition-all shadow-[0_0_25px_rgba(79,70,229,0.3)] active:scale-95">
            <Rocket size={14} /> Deploy
          </button>
        </header>

        <div className="flex-1 w-full overflow-hidden">
          <SandpackProvider
            template="react"
            theme="dark"
            files={files}
            options={{ externalResources: ["https://cdn.tailwindcss.com"] }}
            style={{ height: "100%" }}
          >
            <SandpackLayout className="h-full! rounded-none! border-none!">
              <div className={`${isEditorVisible ? "hidden" : "block"} w-full`}>
                <SandpackPreview
                  showOpenInCodeSandbox={false}
                  showRefreshButton={true}
                  style={{ height: "100%" }}
                  className="bg-black!"
                />
              </div>

              <div className={`${isEditorVisible ? "" : "hidden"} w-full`}>
                {/* <SandpackFileExplorer className="h-full! border-r border-white/5 bg-app-bg!" /> */}
                <SandpackCodeEditor
                  showTabs
                  showLineNumbers
                  style={{ height: "100%" }}
                  extensions={[autocompletion()]}
                  className="bg-app-bg!"
                />
              </div>
            </SandpackLayout>
          </SandpackProvider>
        </div>
      </main>
    </div>
  );
}
