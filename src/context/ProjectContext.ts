'use client'

import { createContext, Dispatch, SetStateAction } from "react";

type ProjectProps = {
    currentCode: null | string;
    setCurrentCode: Dispatch<SetStateAction<string>> 
    saveCode: (projectId: number) => void,
    isCodeSaving: boolean
}

export const ProjectCtx = createContext<ProjectProps>({
    currentCode: null,
    setCurrentCode: () => {},
    saveCode: () => {},
    isCodeSaving: false
});

