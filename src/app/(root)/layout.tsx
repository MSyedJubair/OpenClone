import React from "react";
import SideBar from "@/components/Home/SideBar";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen overflow-hidden w-full">
      <SideBar />
      <main className="flex-1 overflow-y-auto bg-background">{children}</main>
    </div>
  );
};

export default layout;
