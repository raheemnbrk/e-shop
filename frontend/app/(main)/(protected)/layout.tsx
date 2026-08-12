import ProtectedRoutes from "@/components/features/layout/protectedRoutes";

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
    return (
        <ProtectedRoutes>{children}</ProtectedRoutes>
    )
}