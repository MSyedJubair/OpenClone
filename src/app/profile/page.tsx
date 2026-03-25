import React from "react";
import { 
  Mail, 
  Calendar, 
  ShieldCheck, 
  LayoutGrid, 
  Settings, 
  LogOut, 
  Zap,
  CheckCircle2
} from "lucide-react";
import { headers } from "next/headers";
import { auth } from "@/lib/auth"; // Adjust based on your auth path
import prisma from "@/lib/db"; // Adjust based on your prisma path
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";

const ProfilePage = async () => {
  // 1. Fetch Session and Headers
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;

  if (!user) {
    redirect("/login"); // Protect the route
  }

  // 2. Fetch data safely using Prisma (matching Dashboard structure)
  const [dbUser, projectCount] = await Promise.all([
    prisma.user.findUnique({
      where: { id: user.id },
    }),
    prisma.project.count({
      where: { authorId: user.id },
    }),
  ]);

  if (!dbUser) return <div className="text-white text-center py-20">User not found.</div>;

  return (
    <div className="min-h-screen bg-app-bg text-zinc-300 pb-20 relative overflow-hidden">
      {/* Background Ambient Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-indigo/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-purple/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-5xl mx-auto px-6 pt-12 relative z-10">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-center gap-8 mb-12 bg-app-surface/40 p-8 rounded-4xl border border-white/5 backdrop-blur-xl">
          <div className="relative group">
            <div className="absolute -inset-1 bg-linear-to-tr from-brand-indigo via-brand-purple to-brand-pink rounded-full blur opacity-25" />
            <Avatar className="h-32 w-32 border-2 border-zinc-900 relative">
              <AvatarImage src={dbUser.image ?? ""} alt={dbUser.name} />
              <AvatarFallback className="bg-zinc-800 text-3xl font-bold">
                {dbUser.name?.charAt(0)}
              </AvatarFallback>
            </Avatar>
          </div>
          
          <div className="flex-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
              <h1 className="text-4xl font-bold text-white tracking-tight">{dbUser.name}</h1>
              {dbUser.emailVerified && (
                <CheckCircle2 className="text-emerald-500 w-6 h-6" />
              )}
            </div>
            <p className="text-zinc-500 text-lg flex items-center justify-center md:justify-start gap-2 mb-6">
              <Mail size={18} /> {dbUser.email}
            </p>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
              <Button variant="outline" className="rounded-xl border-white/10 bg-white/5 hover:bg-white/10 gap-2">
                <Settings size={16} /> Edit Profile
              </Button>
              {/* Note: Logout logic would need a Client Component wrapper or a Server Action */}
              <Button variant="destructive" className="rounded-xl gap-2 bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20">
                <LogOut size={16} /> Logout
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Stats Cards */}
          <Card className="bg-app-surface/50 border-white/5 backdrop-blur-md rounded-3xl overflow-hidden group">
            <CardHeader className="pb-2">
              <CardDescription className="uppercase tracking-widest text-[10px] font-bold text-zinc-500">Workspace</CardDescription>
              <CardTitle className="text-white flex items-center gap-2">
                <LayoutGrid size={20} className="text-brand-indigo" /> Projects
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-white mb-1">
                {projectCount}
              </div>
              <p className="text-xs text-zinc-500">Total applications built</p>
            </CardContent>
          </Card>

          <Card className="bg-app-surface/50 border-white/5 backdrop-blur-md rounded-3xl overflow-hidden">
            <CardHeader className="pb-2">
              <CardDescription className="uppercase tracking-widest text-[10px] font-bold text-zinc-500">Plan</CardDescription>
              <CardTitle className="text-white flex items-center gap-2">
                <Zap size={20} className="text-brand-purple" /> Current Tier
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-white mb-1">Pro</div>
              <p className="text-xs text-brand-purple font-medium">Unlimited AI generations</p>
            </CardContent>
          </Card>

          <Card className="bg-app-surface/50 border-white/5 backdrop-blur-md rounded-3xl overflow-hidden">
            <CardHeader className="pb-2">
              <CardDescription className="uppercase tracking-widest text-[10px] font-bold text-zinc-500">Security</CardDescription>
              <CardTitle className="text-white flex items-center gap-2">
                <ShieldCheck size={20} className="text-emerald-500" /> Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-white mb-1">Active</div>
              <p className="text-xs text-zinc-500 flex items-center gap-1">
                <Calendar size={12} /> Joined {new Date(dbUser.createdAt).toLocaleDateString()}
              </p>
            </CardContent>
          </Card>

          {/* Account Settings Form (Spans 2/3) */}
          <Card className="md:col-span-2 bg-app-surface/50 border-white/5 backdrop-blur-md rounded-3xl">
            <CardHeader>
              <CardTitle className="text-white">Account Information</CardTitle>
              <CardDescription>Update your public profile and email settings.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Full Name</label>
                  <input 
                    defaultValue={dbUser.name ?? ""} 
                    className="w-full bg-zinc-950/50 border border-white/10 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-brand-indigo/50 outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Email Address</label>
                  <input 
                    readOnly 
                    defaultValue={dbUser.email} 
                    className="w-full bg-zinc-900 border border-white/5 rounded-xl px-4 py-3 text-sm text-zinc-500 cursor-not-allowed outline-none"
                  />
                </div>
              </div>
              {/* This button will need a Server Action or a Client Wrapper to handle the click */}
              <Button className="bg-white text-black hover:bg-zinc-200 rounded-xl px-8 font-bold">
                Save Changes
              </Button>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="bg-linear-to-br from-brand-indigo/20 to-brand-purple/20 border-brand-indigo/20 backdrop-blur-md rounded-3xl">
            <CardHeader>
              <CardTitle className="text-white">Need help?</CardTitle>
              <CardDescription className="text-zinc-400">Our support team is available 24/7 for Pro members.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl font-bold">
                Contact Support
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;