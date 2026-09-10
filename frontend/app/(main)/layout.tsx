import Footer from "@/components/features/layout/footer";
import Navbar from "@/components/features/layout/navBar";

export default function ({ children }: Children) {
  return (
    <div className="flex flex-col min-h-screen bg-background dark:bg-dark-background">
      <Navbar />
      <div className="flex-1 px-4 md:px-8 py-4">
        {children}
      </div>
      <Footer />
    </div>
  );
}