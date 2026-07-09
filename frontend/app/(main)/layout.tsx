import Navbar from "@/components/features/layout/navBar";

export default function ({ children }: Children) {
  return (
    <div>
      <Navbar />
      <div className="px-4 md:px-8 py-4 min-h-screen bg-background dark:bg-dark-background">
        {children}
      </div>
    </div>
  );
}
