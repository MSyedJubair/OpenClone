"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { getWebContainer } from "@/lib/webcontainer";
import { Allotment } from "allotment";
import "allotment/dist/style.css";
import "@xterm/xterm/css/xterm.css";
import { Terminal } from "@xterm/xterm";
import { Spinner } from "./ui/spinner";
import { Maximize2, RefreshCw, Terminal as TerminalIcon, Globe, Command } from "lucide-react";

export default function WebPreview({ files }: { files: any }) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [status, setStatus] = useState("Initializing...");
  const [isTerminalVisible, setIsTerminalVisible] = useState(false);
  
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const isBooted = useRef(false);
  const terminalRef = useRef<HTMLDivElement>(null);
  const terminalInstance = useRef<Terminal | null>(null);

  // Keyboard shortcut handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Shortcut: Ctrl + ` (backtick)
      if (e.ctrlKey && e.key === "`") {
        e.preventDefault();
        setIsTerminalVisible((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (isBooted.current) return;
    isBooted.current = true;

    async function startPreview() {
      try {
        const wc = await getWebContainer();
        
        if (!terminalInstance.current) {
          terminalInstance.current = new Terminal({
            convertEol: true,
            theme: { 
              background: "#09090b", // zinc-950
              foreground: "#e4e4e7", // zinc-200
              cursor: "#3b82f6" 
            },
            fontSize: 12,
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
          });
        }
        terminalInstance.current.open(terminalRef.current!);

        setStatus("Mounting files...");
        await wc!.mount(files);

        setStatus("Installing dependencies...");
        const installProcess = await wc!.spawn("npm", ["install"]);
        installProcess.output.pipeTo(
          new WritableStream({
            write(data) { terminalInstance.current?.write(data); },
          })
        );
        await installProcess.exit;

        setStatus("Starting dev server...");
        const runProcess = await wc!.spawn("npm", ["run", "dev"]);
        runProcess.output.pipeTo(
          new WritableStream({
            write(data) { terminalInstance.current?.write(data); },
          })
        );

        wc!.on("server-ready", (port, url) => {
          setStatus("Ready");
          setPreviewUrl(url);
        });
      } catch (err) {
        setStatus("Environment Error");
      }
    }

    startPreview();
  }, [files]);

  return (
    <div className="flex flex-col h-full border border-zinc-800 rounded-xl overflow-hidden bg-zinc-950 text-zinc-200 shadow-2xl">
      {/* Dark Browser Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-zinc-900 border-b border-zinc-800 select-none">
        <div className="flex items-center gap-4">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-zinc-700" />
            <div className="w-3 h-3 rounded-full bg-zinc-700" />
            <div className="w-3 h-3 rounded-full bg-zinc-700" />
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-zinc-950 border border-zinc-800 rounded-lg text-xs font-mono text-zinc-400 min-w-60">
            <Globe size={14} className="text-zinc-500" />
            <span className="truncate">{previewUrl || "localhost:3000"}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-1 px-2 py-1 rounded bg-zinc-800 text-[10px] text-zinc-500 border border-zinc-700 mr-2">
            <Command size={10} /> + `
          </div>
          <button 
            onClick={() => setIsTerminalVisible(!isTerminalVisible)}
            className={`p-2 rounded-lg transition-all ${isTerminalVisible ? 'bg-blue-600 text-white' : 'text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200'}`}
            title="Toggle Terminal (Ctrl + `)"
          >
            <TerminalIcon size={18} />
          </button>
          <button 
            onClick={() => iframeRef.current?.src && (iframeRef.current.src = iframeRef.current.src)}
            className="p-2 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200 rounded-lg transition-colors"
          >
            <RefreshCw size={18} />
          </button>
        </div>
      </div>

      <div className="flex-1 relative bg-zinc-950">
        <Allotment vertical>
          <Allotment.Pane>
            {!previewUrl ? (
              <div className="flex flex-col items-center justify-center h-full space-y-6">
                <div className="relative flex items-center justify-center">
                  <div className="absolute w-16 h-16 bg-blue-500/20 rounded-full blur-2xl animate-pulse" />
                  <Spinner className="w-8 h-8 text-blue-500" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-zinc-200 animate-pulse">
                    {status}
                  </p>
                  <p className="text-[11px] text-zinc-500 mt-2 uppercase tracking-widest font-semibold">
                    Spinning up container
                  </p>
                </div>
              </div>
            ) : (
              <div className="w-full h-full bg-white rounded-md m-0 overflow-hidden">
                <iframe
                  ref={iframeRef}
                  src={previewUrl}
                  className="w-full h-full border-none"
                />
              </div>
            )}
          </Allotment.Pane>

          <Allotment.Pane 
            preferredSize={isTerminalVisible ? "50%" : "0%"} 
            visible={isTerminalVisible}
            snap
          >
            <div className="h-full bg-zinc-950 border-t border-zinc-800 p-2">
               <div ref={terminalRef} className="h-full w-full" />
            </div>
          </Allotment.Pane>
        </Allotment>
      </div>
    </div>
  );
}