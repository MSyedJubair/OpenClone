export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-app-bg text-white flex items-center justify-center relative overflow-hidden">
      
      {/* Animated Background Blobs */}
      <div className="absolute w-[500px] h-[500px] bg-brand-indigo opacity-20 blur-3xl rounded-full animate-drift top-[-100px] left-[-100px]" />
      <div className="absolute w-[400px] h-[400px] bg-brand-purple opacity-20 blur-3xl rounded-full animate-drift-slow bottom-[-100px] right-[-100px]" />
      <div className="absolute w-[300px] h-[300px] bg-brand-pink opacity-20 blur-3xl rounded-full animate-drift top-[40%] left-[60%]" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-md">
        {children}
      </div>
    </div>
  );
}