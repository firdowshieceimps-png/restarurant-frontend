import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

import api from "../services/api";
import { loginSuccess } from "../redux/slices/authSlice";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/auth/login", formData);

      dispatch(
        loginSuccess({
          user: response.data.user,
          token: response.data.token,
        })
      );

      toast.success(response.data.message);

      // Redirect based on role
      if (response.data.user.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Login failed"
      );
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-5">

          <div className="card shadow">

            <div className="card-header bg-primary text-white text-center">
              <h3>Login</h3>
            </div>

            <div className="card-body">

              <form onSubmit={handleSubmit}>

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

                <button className="btn btn-primary w-100">
                  Login
                </button>

              </form>

              <p className="text-center mt-3">
                Don't have an account?{" "}
                <Link to="/register">Register</Link>
              </p>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

export default Login;