import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../services/api";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer",
  });

  const { name, email, password, role } = formData;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/auth/register", formData);

      toast.success(response.data.message);

      navigate("/login");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Registration failed"
      );
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">

          <div className="card shadow">

            <div className="card-header bg-success text-white text-center">
              <h3>Create Account</h3>
            </div>

            <div className="card-body">

              <form onSubmit={handleSubmit}>

                <div className="mb-3">
                  <label>Name</label>

                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label>Email</label>

                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label>Password</label>

                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    value={password}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label>Role</label>

                  <select
                    className="form-select"
                    name="role"
                    value={role}
                    onChange={handleChange}
                  >
                    <option value="customer">Customer</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>

                <button className="btn btn-success w-100">
                  Register
                </button>

              </form>

              <p className="text-center mt-3">
                Already have an account?{" "}
                <Link to="/login">Login</Link>
              </p>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

export default Register;