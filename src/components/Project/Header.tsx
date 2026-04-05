import { auth } from "@/lib/auth";
import prisma from "@/lib/db";
import { ChevronRight, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { headers } from "next/headers";
import { timeAgo } from "@/lib/utils";

const Header = async ({ projectId }: { projectId: string }) => {
  const project = await prisma.project.findUnique({
    where: { id: Number(projectId) },
  });

  const user = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-800/60 bg-zinc-950/70 backdrop-blur-xl">
      <div className="flex h-14 items-center justify-between px-6">
        
        {/* Left Side: Logo & Breadcrumbs */}
        <div className="flex items-center gap-3 overflow-hidden">
          <Link
            href="/"
            className="flex items-center gap-2.5 transition-colors hover:opacity-90"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-900 border border-zinc-800 shadow-inner">
              <Image
                src="/Logo.png"
                alt="Logo"
                width={20}
                height={20}
                className="brightness-110"
              />
            </div>
            <span className="hidden text-sm font-medium tracking-tight text-zinc-400 md:block">
              OpenClone
            </span>
          </Link>

          <ChevronRight className="h-4 w-4 shrink-0 text-zinc-600" />

          <div className="flex items-center gap-3 min-w-0">
            <span className="truncate text-sm font-semibold text-zinc-100">
              {project?.name || "Untitled Project"}
            </span>
            
            <div className="hidden items-center gap-1.5 rounded-full border border-zinc-800 bg-zinc-900/50 px-2 py-0.5 text-[11px] font-medium text-zinc-500 lg:flex">
              <Clock className="h-3 w-3" />
              <span>{timeAgo(project?.createdAt || '')}</span>
            </div>
          </div>
        </div>

        {/* Right Side: Actions & Profile */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-3 pr-4 border-r border-zinc-800/60">
             {/* Add a subtle "Live" or "Status" indicator here if needed */}
             <div className="flex items-center gap-2 text-[12px] text-zinc-400 hover:text-zinc-200 transition-colors cursor-default">
                <div className="h-1.5 w-1.5 rounded-full bg-gray-500 animate-pulse" />
                {project?.status}
             </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right hidden md:block">
              <p className="text-xs font-medium text-zinc-200 leading-none">
                {user?.user.name}
              </p>
            </div>

            <button className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-indigo-500/30 bg-indigo-500/10 transition-transform active:scale-95">
              {user?.user.image ? (
                <Image
                  src={user?.user.image}
                  alt="Profile"
                  className="h-full w-full rounded-full object-cover shadow-lg"
                />
              ) : (
                <span className="text-sm font-semibold text-indigo-400 uppercase">
                  {user?.user.name?.[0]}
                </span>
              )}
              {/* Online Indicator Badge */}
              <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-zinc-950 bg-emerald-500" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;