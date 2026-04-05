"use client";

import { CopyMinus, Files, SaveAll } from "lucide-react";
import { useState } from "react";
import { 
  ControlledTreeEnvironment, 
  Tree, 
  TreeItem, 
  TreeItemIndex 
} from "react-complex-tree";

import Editor from "@monaco-editor/react";
import "react-complex-tree/lib/style-modern.css";
import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";

/** * Types for the WebContainer template structure 
 */
export interface FileNode {
  file: {
    contents: string;
  };
}

export interface DirectoryNode {
  directory: WebContainerTemplate;
}

export type WebContainerTemplate = Record<string, FileNode | DirectoryNode>;

/**
 * Type for the items stored in the Tree
 */
interface CustomTreeItem extends TreeItem {
  index: string;
  canMove: boolean;
  isFolder: boolean;
  children: string[];
  data: string;
  content: string | null;
}

interface TreeData {
  items: Record<string, CustomTreeItem>;
}

const readWebContainerTemplate = (
  template: WebContainerTemplate,
  data: TreeData = { items: {} },
  path: string = "",
): TreeData => {
  for (const [key, value] of Object.entries(template)) {
    const id = path ? `${path}/${key}` : key;
    const isFolder = "directory" in value;

    data.items[id] = {
      index: id,
      canMove: true,
      isFolder,
      children: isFolder
        ? Object.keys((value as DirectoryNode).directory).map((child) => `${id}/${child}`)
        : [],
      data: key,
      content: !isFolder ? (value as FileNode).file?.contents : null,
    };

    if (isFolder) {
      readWebContainerTemplate((value as DirectoryNode).directory, data, id);
    }
  }

  return data;
};

interface CodeEditorProps {
  code: WebContainerTemplate;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ code }) => {
  const tree = readWebContainerTemplate({
    root: {
      directory: code,
    },
  });

  const trpc = useTRPC();

  // Assuming mutationOptions provides the correct generic types from your TRPC router
  const { mutate: SaveCode } = useMutation(
    trpc.project.saveCode.mutationOptions(),
  );

  const [focusedItem, setFocusedItem] = useState<TreeItemIndex | undefined>();
  const [expandedItems, setExpandedItems] = useState<TreeItemIndex[]>([]);
  const [selectedItems, setSelectedItems] = useState<TreeItemIndex[]>([]);
  const [Code, setCode] = useState<string>("");

  return (
    <div className="flex flex-row w-full h-screen">
      <div className="rct-dark min-w-sm flex flex-col">
        <button
          onClick={() => {
            setExpandedItems([]);
          }}
          className="ml-auto p-4"
        >
          <CopyMinus size={15} />
        </button>
        <ControlledTreeEnvironment
          items={tree.items}
          getItemTitle={(item) => item.data}
          viewState={{
            ["tree-1"]: {
              focusedItem,
              expandedItems,
              selectedItems,
            },
          }}
          onFocusItem={(item) => setFocusedItem(item.index)}
          onExpandItem={(item) =>
            setExpandedItems([...expandedItems, item.index])
          }
          onCollapseItem={(item) =>
            setExpandedItems(
              expandedItems.filter(
                (expandedItemIndex) => expandedItemIndex !== item.index,
              ),
            )
          }
          onSelectItems={(items) => {
            setSelectedItems(items);

            const selected = items[0];
            const item = tree.items[selected as string];

            if (item && !item.isFolder) {
              console.log("File:", item.data);
              console.log("Code:", item.content);
              setCode(item.content ?? "");
            }
          }}
        >
          <Tree treeId="tree-1" rootItem="root" treeLabel="Tree Example" />
        </ControlledTreeEnvironment>
      </div>
      <div style={{ flex: 1, paddingTop: 8, background: "#1e1e1e" }}>
        <div className="h-9 border-b border-white/5 bg-zinc-900/80 flex items-center justify-between px-4 shrink-0">
          <span className="text-[10px] uppercase tracking-widest font-bold text-zinc-500 flex items-center gap-2">
            <Files size={12} /> Editor
          </span>
          <button
            className="text-[10px] uppercase tracking-widest font-bold text-zinc-500 flex items-center gap-2"
            onClick={() =>
              SaveCode({
                files: "", 
                projectId: 2, // Todo - will do later
              })
            }
          >
            <SaveAll size={12} /> Save
          </button>
        </div>
        <Editor
          width="100%"
          height="100%"
          language="javascript"
          theme="vs-dark"
          key={selectedItems[0] as string}
          value={Code}
          onChange={(value) => {
            setCode(value ?? "");
          }}
        />
      </div>
    </div>
  );
};

export default CodeEditor;