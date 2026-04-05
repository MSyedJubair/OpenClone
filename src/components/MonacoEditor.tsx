import Editor from "@monaco-editor/react";
import {
  useActiveCode,
  SandpackStack,
  useSandpack,
} from "@codesandbox/sandpack-react";
import { useContext } from "react";
import { ProjectCtx } from "@/context/ProjectContext";

import { Files, SaveAll } from "lucide-react";

export default function MonacoEditor() {
  const { code, updateCode } = useActiveCode();
  const { sandpack } = useSandpack();

  const { files, activeFile } = sandpack;

  const projectCTX = useContext(ProjectCtx);

  return (
    <SandpackStack style={{ height: "100%", margin: 0, width: "100%" }}>
      <div className="h-9 border-b border-white/5 bg-zinc-900/80 flex items-center justify-between px-4 shrink-0">
        <span className="text-[10px] uppercase tracking-widest font-bold text-zinc-500 flex items-center gap-2">
          <Files size={12} /> Editor
        </span>
        <span className="text-[10px] uppercase tracking-widest font-bold text-zinc-500 flex items-center gap-2">
          <SaveAll size={12} /> Save
        </span>
      </div>
      <div style={{ flex: 1, paddingTop: 8, background: "#1e1e1e" }}>
        <Editor
          width="100%"
          height="100%"
          language="javascript"
          theme="vs-dark"
          key={sandpack.activeFile}
          defaultValue={code}
          onChange={(value) => {
            updateCode(value || "");
            projectCTX.setCurrentCode(files as unknown as string);
          }}
        />
      </div>
    </SandpackStack>
  );
}
