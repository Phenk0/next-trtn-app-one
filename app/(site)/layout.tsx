import AppHeader from "@/components/appHeader";
import { Sidebar } from "@/components/sidebar/components/sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AppHeader />
      <div className="flex h-screen overflow-hidden border-collapse">
        <Sidebar />
        <main className="min-h-screen flex-1 overflow-y-auto overflow-x-hidden py-24 px-8 flex flex-col bg-secondary/20">
          {children}
        </main>
      </div>
    </>
  );
}
