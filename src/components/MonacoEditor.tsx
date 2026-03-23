import Editor from "@monaco-editor/react";
import {
  useActiveCode,
  SandpackStack,
  useSandpack,
} from "@codesandbox/sandpack-react";

export default function MonacoEditor({ projectId, mutate }) {
  const { code, updateCode } = useActiveCode();
  const { sandpack } = useSandpack();

  return (
    <SandpackStack style={{ height: "100%", margin: 0, width: "100%" }}>
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
            mutate({
              files: value || '',
              projectId: projectId,
            });
          }}
        />
      </div>
    </SandpackStack>
  );
}
