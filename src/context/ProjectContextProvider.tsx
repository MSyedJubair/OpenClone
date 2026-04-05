"use client";

import { useMutation } from "@tanstack/react-query";
import { ProjectCtx } from "./ProjectContext";
import { useTRPC } from "@/trpc/client";

import { useState } from "react";

const ProjectContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const trpc = useTRPC();
  const { mutate: SaveCurrentCode, isPending: isCodeSaving } = useMutation(
    trpc.project.saveCode.mutationOptions(),
  );
  const [currentCode, setCurrentCode] = useState('');

  console.log(currentCode)

  function SaveCode(projectId: number ) {
    SaveCurrentCode({
      files: currentCode,
      projectId: projectId,
    });
  }

  return (
    <ProjectCtx
      value={{
        currentCode: currentCode,
        setCurrentCode: setCurrentCode,
        saveCode: SaveCode,
        isCodeSaving
      }}
    >
      {children}
    </ProjectCtx>
  );
};

export default ProjectContextProvider;
