import RecentUser from "./RecentUser";
import StatCard from "../components/StatCard";
import UserChart from "./UserChart";
import JobPieChart from "./JobPieChart";
import UserPieChart from "./UserPieChart";

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
          <UserChart />
      </div>

      {/* Charts Section */}
      <div className="row">
        <div className="col-md-6">
          <JobPieChart />
        </div>
        <div className="col-md-6">
          <UserPieChart />
        </div>
      </div>

      {/* Recent Users Table */}
      <RecentUser />
    </div>
  );
}

export default Dashboard;
