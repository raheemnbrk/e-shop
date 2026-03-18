import DashboardNavbar from "../components/dashboardNavbar";
import DashBoard from "./dashboard";

export default function DashboardLayout() {
  return (
    <div>
      <DashboardNavbar />
      <DashBoard />
    </div>
  );
}
