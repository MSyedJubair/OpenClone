"use client";
import { ChevronDown, Paperclip, ArrowUp } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const PromptInput = () => {
  const [prompt, setPrompt] = useState("");

  const router = useRouter();

  const handleSend = async () => {
    // Create a new Project
    
  }
  return (
    <>
      <div className="relative w-full max-w-3xl group">
        <div className="absolute -inset-1 bg-linear-to-tr from-indigo-500 via-purple-500 to-pink-500 rounded-4xl blur-lg opacity-20 group-hover:opacity-40 transition duration-500"></div>

        <div className="relative bg-app-surface/80 backdrop-blur-xl border border-white/10 rounded-4xl p-3 shadow-2xl flex flex-col">
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
                Model: Claude 3.5 Sonnet <ChevronDown className="w-4 h-4" />
              </button>
            </div>

            <button
              className={`p-3 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                prompt.length > 0
                  ? "bg-white text-black hover:bg-zinc-200 hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                  : "bg-white/10 text-white/30 cursor-not-allowed"
              }`}
              onClick={handleSend}
            >
              <ArrowUp className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-4 mt-10">
        {[
          "Social Network feed",
          "Landing page for an AI startup",
          "Task management app",
          "Crypto tracker",
        ].map((suggestion) => (
          <button
            key={suggestion}
            onClick={() => setPrompt(`Build a ${suggestion.toLowerCase()}...`)}
            className="px-5 py-2.5 rounded-full border border-white/10 bg-white/5 text-sm font-medium text-zinc-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all"
          >
            {suggestion}
          </button>
        ))}
      </div>
    </>
  );
};

export default PromptInput;
