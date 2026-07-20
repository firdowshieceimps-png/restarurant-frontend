import { useEffect, useState } from "react";
import api from "../../services/api";
import { toast } from "react-toastify";

function ManageOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await api.get("/orders");
      setOrders(res.data.data);
    } catch (error) {
      toast.error("Failed to load orders");
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const res = await api.put(`/orders/${id}`, {
        status,
      });

      toast.success(res.data.message);

      fetchOrders();
    } catch (error) {
      toast.error("Unable to update order");
    }
  };

  return (
    <div className="container mt-4">

      <div className="card shadow">

        <div className="card-header bg-dark text-white">
          <h3>Manage Orders</h3>
        </div>

        <div className="card-body">

          <table className="table table-bordered table-hover">

            <thead className="table-dark">

              <tr>
                <th>Customer</th>
                <th>Items</th>
                <th>Total</th>
                <th>Status</th>
                <th>Update</th>
              </tr>

            </thead>

            <tbody>

              {orders.map((order) => (

                <tr key={order._id}>

                  <td>{order.customer?.name}</td>

                  <td>
                    {order.items.map((item, index) => (
                      <div key={index}>
                        {item.menuItem?.name} × {item.quantity}
                      </div>
                    ))}
                  </td>

                  <td>₹ {order.totalAmount}</td>

                  <td>
                    <span className="badge bg-primary">
                      {order.status}
                    </span>
                  </td>

                  <td>

                    <select
                      className="form-select"
                      value={order.status}
                      onChange={(e) =>
                        updateStatus(
                          order._id,
                          e.target.value
                        )
                      }
                    >
                      <option>Pending</option>
                      <option>Preparing</option>
                      <option>Ready</option>
                      <option>Delivered</option>
                      <option>Cancelled</option>
                    </select>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default ManageOrders;