import { Link } from "react-router-dom";
import "../styles/sidebar.css";

function Sidebar() {
  return (
    <div className="sidebar">
      <h2 className="logo">Admin Panel</h2>

      <nav>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/customers">Customers</Link>
        {/* <Link to="/orders">Orders</Link>
        <Link to="/reports">Reports</Link>
        <Link to="/settings">Settings</Link> */}
      </nav>
    </div>
  );
}

export default Sidebar;