import { useEffect, useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify";

function MyOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await api.get("/orders/my-orders");
      setOrders(response.data.data);
    } catch (error) {
      toast.error("Unable to load orders");
    }
  };

  return (
    <div className="container mt-4">
      <h2>📦 My Orders</h2>

      {orders.length === 0 ? (
        <div className="alert alert-warning">
          No orders found.
        </div>
      ) : (
        orders.map((order) => (
          <div key={order._id} className="card shadow mb-3">
            <div className="card-body">

              <h5>Order ID</h5>
              <p>{order._id}</p>

              <h5>Order Name</h5>
              <p>{order.name}</p>

              <h5>Total Amount</h5>
              <p>₹ {order.totalAmount}</p>

              <h5>Status</h5>

              <span className="badge bg-primary">
                {order.status}
              </span>

            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default MyOrders;
