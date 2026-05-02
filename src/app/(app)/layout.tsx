import { Sidebar } from "@/components/Sidebar";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 lg:pl-[280px] transition-all duration-300">
        <div className="max-w-[1600px] mx-auto p-6 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
