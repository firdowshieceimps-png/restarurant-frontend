import { useState } from "react";
import api from "../../services/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function AddMenu() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: "",
    available: true,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]:
        name === "available"
          ? value === "true"
          : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/menu", formData);

      toast.success(response.data.message);

      navigate("/admin/menu");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to add menu item"
      );
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow p-4">

        <h2 className="mb-4">➕ Add Menu Item</h2>

        <form onSubmit={handleSubmit}>

          <div className="mb-3">
            <label>Name</label>
            <input
              className="form-control"
              name="name"
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label>Description</label>
            <textarea
              className="form-control"
              name="description"
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label>Price</label>
            <input
              type="number"
              className="form-control"
              name="price"
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label>Category</label>
            <input
              className="form-control"
              name="category"
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label>Image URL</label>
            <input
              className="form-control"
              name="image"
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label>Available</label>

            <select
              className="form-select"
              name="available"
              onChange={handleChange}
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>

          <button className="btn btn-success">
            Save Menu Item
          </button>

        </form>

      </div>
    </div>
  );
}

export default AddMenu;