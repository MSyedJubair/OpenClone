import { useParams } from "next/navigation";
import Chat from "./Chat";

const ProjectSideBar = ({ isAuthor }: { isAuthor: boolean }) => {
  const { projectId } = useParams();

  return (
    <aside
      className={`relative flex flex-col bg-app-surface/80 backdrop-blur-xl border-r border-white/5 transition-[width] duration-300 ease-in-out z-20 h-full`}
    >
      <Chat projectId={projectId?.toString() ?? ""} isAuthor={isAuthor} />
    </aside>
  );
};

export default ProjectSideBar;
