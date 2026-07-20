import { useEffect, useState } from "react";
import api from "../../services/api";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function ManageMenu() {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    fetchMenu();
  }, []);

  const navigate = useNavigate();

  const fetchMenu = async () => {
    try {
      const response = await api.get("/menu");
      setMenuItems(response.data.data);
    } catch (error) {
      toast.error("Unable to load menu.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this menu item?")) return;

    try {
      await api.delete(`/menu/${id}`);
      toast.success("Menu item deleted successfully");
      fetchMenu();
    } catch (error) {
      toast.error(error.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>🍽 Manage Menu</h2>

        <Link
          to="/admin/menu/add"
          className="btn btn-success">
          Add Menu Item
        </Link>
      </div>

      <table className="table table-bordered table-hover">
        <thead className="table-dark">
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Available</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {menuItems.map((item) => (
            <tr key={item._id}>
              <td>
                <img
                  src={item.image}
                  alt={item.name}
                  width="70"
                  height="70"
                  style={{ objectFit: "cover" }}
                />
              </td>

              <td>{item.name}</td>
              <td>{item.category}</td>
              <td>₹ {item.price}</td>
              <td>
                {item.available ? "Yes" : "No"}
              </td>

              <td>
                <button
                  className="btn btn-primary btn-sm me-2"
                  onClick={() => navigate(`/admin/menu/edit/${item._id}`)}
                >
                  Edit
                </button>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(item._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ManageMenu;