import ProjectMain from "@/components/ProjectMain";
import ProjectSideBar from "@/components/ProjectSideBar";

export default function LovableClone() {
  return (
    <div
      className={`flex h-screen w-full bg-app-bg text-zinc-300 overflow-hidden selection:bg-indigo-500/30 font-sans `}
    >

      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-indigo-500/10 rounded-full blur-[120px] animate-drift" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-purple-500/10 rounded-full blur-[120px] animate-drift-slow" />
      </div>

      {/* LEFT: Resizable & Collapsible Chat Panel} */}
      <ProjectSideBar/>

      {/* RIGHT: Preview & Code Panel */}
      <ProjectMain />
    </div>
  );
}
