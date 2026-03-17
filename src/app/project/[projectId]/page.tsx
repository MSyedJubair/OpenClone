"use client";

import React, { useState } from "react";
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

export default function LovableClone() {
  const [isChatOpen, setIsChatOpen] = useState(true);
  const [isEditorVisible, setIsEditorVisible] = useState(false);
  const [chatInput, setChatInput] = useState("");

  // This state represents the code being "generated" by your AI
  const [files, setFiles] = useState({
    "/App.js": `export default function App() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-white p-4">
      <h1 className="text-4xl font-bold mb-4">Hello Lovable Clone!</h1>
      <p className="text-slate-400">Type something in the chat to see me change.</p>
    </div>
  );
}`,
  });

  const getAiResponse = async (prompt: string) => {
    const res = await fetch("/api/generate", {
      method: "POST",
      body: JSON.stringify({ prompt }),
    });

    const data = await res.json();

    setFiles({
      "/App.js": data.code
        .replace(/```jsx/g, "")
        .replace(/```/g, "")
        .trim(),
    });
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    getAiResponse(chatInput);
    setChatInput("");
  };

  return (
    <div className="flex h-screen w-full bg-[#050505] text-gray-300 overflow-hidden selection:bg-indigo-500/30">
      {/* LEFT: Collapsible Chat Panel */}
      <aside
        className={`relative flex flex-col bg-[#0A0A0A] border-r border-white/5 transition-all duration-300 ease-in-out shadow-2xl z-20 ${
          isChatOpen ? "w-[380px]" : "w-0"
        }`}
      >
        <div
          className={`flex flex-col h-full w-[380px] ${!isChatOpen && "opacity-0 invisible"}`}
        >
          {/* Sidebar Header */}
          <header className="p-5 border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 bg-indigo-600 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(79,70,229,0.4)]">
                <Zap size={14} className="text-white fill-current" />
              </div>
              <span className="font-semibold text-sm tracking-wide text-white">
                lovable.ai
              </span>
            </div>
            <button className="p-1.5 hover:bg-white/5 rounded-md transition-colors text-gray-500 hover:text-white">
              <Plus size={18} />
            </button>
          </header>

          {/* Chat Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar">
            <div className="flex gap-3">
              <div className="w-6 h-6 rounded-full bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center flex-shrink-0 mt-1">
                <Sparkles size={12} className="text-indigo-400" />
              </div>
              <div className="space-y-2 max-w-[85%]">
                <div className="text-[13px] leading-relaxed bg-white/5 border border-white/10 p-3 rounded-2xl rounded-tl-none text-gray-200">
                  I&apos;ve initialized your React project with Tailwind CSS.
                  What features should we add first?
                </div>
                <span className="text-[10px] uppercase tracking-widest text-gray-600 font-bold ml-1">
                  AI Assistant
                </span>
              </div>
            </div>
          </div>

          {/* Chat Input */}
          <footer className="p-4 bg-[#0A0A0A] border-t border-white/5">
            <div className="relative group">
              <textarea
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Ask Lovable to build something..."
                className="w-full bg-white/[0.03] border border-white/10 rounded-2xl p-4 pr-12 text-[13px] focus:outline-none focus:ring-1 focus:ring-indigo-500/50 focus:border-indigo-500/50 resize-none h-28 transition-all placeholder:text-gray-600 shadow-inner"
              />
              <button className="absolute right-3 bottom-3 p-2 bg-white text-black hover:bg-gray-200 rounded-xl transition-all shadow-lg active:scale-95">
                <Send size={14} />
              </button>
            </div>
            <p className="text-[10px] text-center text-gray-600 mt-3 font-medium">
              Press Cmd + Enter to send
            </p>
          </footer>
        </div>

        {/* Collapse Toggle Button (Floated on border) */}
        <button
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-12 bg-[#0A0A0A] border border-white/10 rounded-full flex items-center justify-center hover:bg-indigo-600 hover:border-indigo-500 transition-all group z-50 shadow-xl"
        >
          {isChatOpen ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
        </button>
      </aside>

      {/* RIGHT: Preview & Code Panel */}
      <main className="flex-1 flex flex-col min-w-0 bg-[#050505]">
        <header className="h-14 border-b border-white/5 flex items-center justify-between px-6">
          <div className="flex bg-white/[0.03] p-1 rounded-xl border border-white/5">
            <button
              onClick={() => setIsEditorVisible(false)}
              className={`flex items-center gap-2 px-4 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                !isEditorVisible
                  ? "bg-white/10 text-white shadow-sm"
                  : "text-gray-500 hover:text-gray-300"
              }`}
            >
              <Play
                size={12}
                className={!isEditorVisible ? "text-indigo-400" : ""}
              />{" "}
              Preview
            </button>
            <button
              onClick={() => setIsEditorVisible(true)}
              className={`flex items-center gap-2 px-4 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                isEditorVisible
                  ? "bg-white/10 text-white shadow-sm"
                  : "text-gray-500 hover:text-gray-300"
              }`}
            >
              <Code
                size={12}
                className={isEditorVisible ? "text-indigo-400" : ""}
              />{" "}
              Code
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold transition-all shadow-[0_0_20px_rgba(79,70,229,0.3)] active:scale-95">
              <Rocket size={12} />
              Deploy
            </button>
          </div>
        </header>

        <div className="flex-1 w-full overflow-hidden relative">
          <SandpackProvider
            template="react"
            theme="dark"
            files={files}
            options={{
              externalResources: ["https://cdn.tailwindcss.com"],
            }}
            style={{ height: "100%" }}
          >
            <SandpackLayout className="!h-full !rounded-none !border-none">
              <SandpackFileExplorer className="!h-full border-r border-white/5 !bg-[#0A0A0A]" />
              {isEditorVisible ? (
                <SandpackCodeEditor
                  showTabs
                  showLineNumbers
                  style={{ height: "100%" }}
                  extensions={[autocompletion()]}
                  className="!bg-[#050505]"
                />
              ) : (
                <SandpackPreview
                  showOpenInCodeSandbox={false}
                  showRefreshButton={true}
                  style={{ height: "100%" }}
                  className="!bg-white"
                />
              )}
            </SandpackLayout>
          </SandpackProvider>
        </div>
      </main>
    </div>
  );
}
