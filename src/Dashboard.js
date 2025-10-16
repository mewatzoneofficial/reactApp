import RecentUser from "./components/RecentUser";
import OrdersPieChart from "./components/OrdersPieChart";
import UserGrowthChart from "./components/UserGrowthChart";
import StatCard from "./components/StatCard";

function Dashboard() {
  return (
    <div>
      {/* Stat Cards */}
      <div className="card">
        <div className="row">
          <StatCard />
        </div>
      </div>

      {/* Charts Section */}
      <div className="row">
        <div className="col-md-7">
          <UserGrowthChart />
        </div>
        <div className="col-md-5">
          <OrdersPieChart />
        </div>
      </div>

      {/* Recent Users Table */}
      <RecentUser />
    </div>
  );
}

export default Dashboard;
