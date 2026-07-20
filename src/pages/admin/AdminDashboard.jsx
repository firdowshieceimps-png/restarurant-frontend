import { useEffect, useState } from "react";
import api from "../../services/api";
import { toast } from "react-toastify";

function AdminDashboard() {
  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const response = await api.get("/admin/dashboard");
      setDashboard(response.data);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Unable to load dashboard"
      );
    }
  };

  if (!dashboard) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-primary"></div>
      </div>
    );
  }

  const stats = dashboard.statistics;

  return (
    <div className="container mt-4">

      <h2 className="mb-4">📊 Admin Dashboard</h2>

      <div className="row">

        <div className="col-md-4 mb-3">
          <div className="card bg-primary text-white shadow">
            <div className="card-body text-center">
              <h5>Total Users</h5>
              <h2>{stats.totalUsers}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className="card bg-success text-white shadow">
            <div className="card-body text-center">
              <h5>Menu Items</h5>
              <h2>{stats.totalMenuItems}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className="card bg-warning text-dark shadow">
            <div className="card-body text-center">
              <h5>Orders</h5>
              <h2>{stats.totalOrders}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className="card bg-info text-white shadow">
            <div className="card-body text-center">
              <h5>Reservations</h5>
              <h2>{stats.totalReservations}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className="card bg-danger text-white shadow">
            <div className="card-body text-center">
              <h5>Feedback</h5>
              <h2>{stats.totalFeedback}</h2>
            </div>
          </div>
        </div>

      </div>

      {/* Recent Orders */}

      <div className="card shadow mt-4">

        <div className="card-header">
          <h4>Recent Orders</h4>
        </div>

        <div className="card-body">

          <table className="table table-bordered">

            <thead>
              <tr>
                <th>Customer</th>
                <th>Total</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>

              {dashboard.recentOrders.map((order) => (
                <tr key={order._id}>
                  <td>{order.customer?.name}</td>
                  <td>₹ {order.totalAmount}</td>
                  <td>{order.status}</td>
                </tr>
              ))}

            </tbody>

          </table>

        </div>

      </div>

      {/* Recent Reservations */}

      <div className="card shadow mt-4">

        <div className="card-header">
          <h4>Recent Reservations</h4>
        </div>

        <div className="card-body">

          <table className="table table-bordered">

            <thead>
              <tr>
                <th>Customer</th>
                <th>Table</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>

              {dashboard.recentReservations.map((reservation) => (
                <tr key={reservation._id}>
                  <td>{reservation.customer?.name}</td>
                  <td>{reservation.tableNumber}</td>
                  <td>
                    {new Date(
                      reservation.reservationDate
                    ).toLocaleDateString()}
                  </td>
                  <td>{reservation.status}</td>
                </tr>
              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default AdminDashboard;