import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";
import { toast } from "react-toastify";

function EditMenu() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: "",
    available: true,
  });

  useEffect(() => {
    fetchMenuItem();
  }, []);

  const fetchMenuItem = async () => {
    try {
      const res = await api.get(`/menu/${id}`);

      setFormData(res.data.data);
    } catch (error) {
      toast.error("Failed to load menu item");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: name === "available" ? value === "true" : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.put(`/menu/${id}`, formData);

      toast.success("Menu updated successfully");

      navigate("/admin/menu");
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed");
    }
  };

  return (
    <div className="container mt-4">

      <div className="card shadow p-4">

        <h2>Edit Menu Item</h2>

        <form onSubmit={handleSubmit}>

          <input
            className="form-control mb-3"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />

          <textarea
            className="form-control mb-3"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />

          <input
            type="number"
            className="form-control mb-3"
            name="price"
            value={formData.price}
            onChange={handleChange}
          />

          <input
            className="form-control mb-3"
            name="category"
            value={formData.category}
            onChange={handleChange}
          />

          <input
            className="form-control mb-3"
            name="image"
            value={formData.image}
            onChange={handleChange}
          />

          <select
            className="form-select mb-3"
            name="available"
            value={formData.available}
            onChange={handleChange}
          >
            <option value={true}>Available</option>
            <option value={false}>Not Available</option>
          </select>

          <button className="btn btn-warning">
            Update Menu
          </button>

        </form>

      </div>

    </div>
  );
}

export default EditMenu;