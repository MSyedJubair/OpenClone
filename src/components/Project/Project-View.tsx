"use client";
import CodePreview from "@/components/Project/Coding-Preview";
import ProjectSideBar from "@/components/Project/ProjectSideBar";
import { Allotment } from "allotment";
import "allotment/dist/style.css";

const Project = ({ isAuthor }: { isAuthor: boolean }) => {
  return (
    <Allotment>
      <Allotment.Pane minSize={250} maxSize={500} snap>
        {/* LEFT: Resizable & Collapsible Chat Panel} */}
        <ProjectSideBar isAuthor={isAuthor} />
      </Allotment.Pane>
      <Allotment.Pane>
        {/* RIGHT: Preview & Code Panel */}
        <CodePreview isAuthor={isAuthor} />
      </Allotment.Pane>
    </Allotment>
  );
};

export default Project;
