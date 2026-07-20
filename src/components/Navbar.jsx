import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/slices/authSlice";

function Navbar() {
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow">
      <div className="container">

        <Link className="navbar-brand fw-bold" to="/">
          🍽 Smart Restaurant
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">

          <ul className="navbar-nav ms-auto">

            {/* Home */}
            <li className="nav-item">
              <Link className="nav-link" to="/">
                <i className="bi bi-house-door me-1"></i>
                Home
              </Link>
            </li>

            {/* Menu */}
            <li className="nav-item">
              <Link className="nav-link" to="/menu">
                <i className="bi bi-grid me-1"></i>
                Menu
              </Link>
            </li>

            {/* Cart */}
            <li className="nav-item">
              <Link className="nav-link" to="/cart">
                <i className="bi bi-cart3 me-1"></i>
                Cart
                <span className="badge bg-danger ms-1">
                  {cartItems.length}
                </span>
              </Link>
            </li>

            {user && (
              <>
                {/* Customer Dropdown */}
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                  >
                    Customer
                  </a>

                  <ul className="dropdown-menu">

                    <li>
                      <Link className="dropdown-item" to="/orders">
                        <i className="bi bi-bag me-2"></i>
                        My Orders
                      </Link>
                    </li>

                    <li>
                      <Link className="dropdown-item" to="/reservation">
                        <i className="bi bi-calendar-event me-2"></i>
                        Reservations
                      </Link>
                    </li>

                    <li>
                      <Link className="dropdown-item" to="/feedback">
                        <i className="bi bi-star me-2"></i>
                        Feedback
                      </Link>
                    </li>

                  </ul>
                </li>

                {/* Admin Dropdown */}
                {user.role === "admin" && (
                  <li className="nav-item dropdown">

                    <a
                      className="nav-link dropdown-toggle text-warning"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                    >
                      Admin
                    </a>

                    <ul className="dropdown-menu">

                      <li>
                        <Link
                          className="dropdown-item"
                          to="/admin/dashboard"
                        >
                          Dashboard
                        </Link>
                      </li>

                      <li>
                        <Link
                          className="dropdown-item"
                          to="/admin/menu"
                        >
                          Manage Menu
                        </Link>
                      </li>

                      <li>
                        <Link
                          className="dropdown-item"
                          to="/admin/menu/add"
                        >
                          Add Menu
                        </Link>
                      </li>

                      <li>
                        <Link
                          className="dropdown-item"
                          to="/admin/orders"
                        >
                          Manage Orders
                        </Link>
                      </li>

                      <li>
                        <Link
                          className="dropdown-item"
                          to="/admin/reservations"
                        >
                          Manage Reservations
                        </Link>
                      </li>

                      <li>
                        <Link
                          className="dropdown-item"
                          to="/admin/feedback"
                        >
                          Manage Feedback
                        </Link>
                      </li>

                    </ul>

                  </li>
                )}

                {/* User Dropdown */}
                <li className="nav-item dropdown">

                  <a
                    className="nav-link dropdown-toggle text-warning"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                  >
                    <i className="bi bi-person-circle me-1"></i>
                    {user.name}
                  </a>

                  <ul className="dropdown-menu dropdown-menu-end">

                    <li>
                      <button
                        className="dropdown-item text-danger"
                        onClick={handleLogout}
                      >
                        <i className="bi bi-box-arrow-right me-2"></i>
                        Logout
                      </button>
                    </li>

                  </ul>

                </li>
              </>
            )}

            {!user && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    className="btn btn-success ms-2"
                    to="/register"
                  >
                    Register
                  </Link>
                </li>
              </>
            )}

          </ul>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;