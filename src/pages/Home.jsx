import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-dark text-white py-5">
        <div className="container">
          <div className="row align-items-center">

            <div className="col-md-6">
              <h1 className="display-4 fw-bold">
                Welcome to Smart Restaurant
              </h1>

              <p className="lead mt-3">
                Delicious food, quick delivery, and easy table reservations —
                all in one place.
              </p>

              <Link to="/menu" className="btn btn-warning btn-lg mt-3">
                🍽 Explore Menu
              </Link>
            </div>

            <div className="col-md-6 text-center">
              <img
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600"
                className="img-fluid rounded shadow"
                alt="Restaurant"
              />
            </div>

          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container my-5">
        <h2 className="text-center mb-4">Why Choose Us?</h2>

        <div className="row">

          <div className="col-md-4 mb-3">
            <div className="card shadow text-center h-100">
              <div className="card-body">
                <i className="bi bi-truck fs-1 text-primary"></i>
                <h4 className="mt-3">Fast Delivery</h4>
                <p>Fresh food delivered quickly to your doorstep.</p>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-3">
            <div className="card shadow text-center h-100">
              <div className="card-body">
                <i className="bi bi-emoji-smile fs-1 text-success"></i>
                <h4 className="mt-3">Quality Food</h4>
                <p>Prepared with fresh ingredients by expert chefs.</p>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-3">
            <div className="card shadow text-center h-100">
              <div className="card-body">
                <i className="bi bi-calendar-check fs-1 text-danger"></i>
                <h4 className="mt-3">Easy Reservation</h4>
                <p>Reserve your table in just a few clicks.</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Popular Categories */}
      <section className="bg-light py-5">
        <div className="container">

          <h2 className="text-center mb-4">Popular Categories</h2>

          <div className="row text-center">

            <div className="col-md-3 mb-3">
              <div className="card shadow">
                <div className="card-body">
                  🍕
                  <h5 className="mt-2">Pizza</h5>
                </div>
              </div>
            </div>

            <div className="col-md-3 mb-3">
              <div className="card shadow">
                <div className="card-body">
                  🍔
                  <h5 className="mt-2">Burger</h5>
                </div>
              </div>
            </div>

            <div className="col-md-3 mb-3">
              <div className="card shadow">
                <div className="card-body">
                  🍝
                  <h5 className="mt-2">Pasta</h5>
                </div>
              </div>
            </div>

            <div className="col-md-3 mb-3">
              <div className="card shadow">
                <div className="card-body">
                  🥗
                  <h5 className="mt-2">Salads</h5>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
