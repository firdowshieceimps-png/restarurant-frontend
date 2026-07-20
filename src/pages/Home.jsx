import { Link } from "react-router-dom";

function Home() {
  return (
    <>

      {/* Hero Section */}
      <section className="bg-dark text-white py-5">
        <div className="container text-center">

          <h1 className="display-4 fw-bold">
            🍽 Welcome to Smart Restaurant
          </h1>

          <p className="lead mt-3">
            Delicious food, online ordering and table reservation
            made simple.
          </p>

          <Link
            to="/menu"
            className="btn btn-success btn-lg mt-3"
          >
            Explore Menu
          </Link>

        </div>
      </section>


      {/* Restaurant Features */}
      <section className="container py-5">

        <h2 className="text-center mb-4">
          Why Choose Us?
        </h2>


        <div className="row g-4">


          <div className="col-md-4">

            <div className="card shadow h-100 text-center p-4">

              <div className="fs-1">
                🍕
              </div>

              <h4 className="mt-3">
                Quality Food
              </h4>

              <p>
                Fresh ingredients and delicious meals
                prepared by professional chefs.
              </p>

            </div>

          </div>



          <div className="col-md-4">

            <div className="card shadow h-100 text-center p-4">

              <div className="fs-1">
                🛒
              </div>

              <h4 className="mt-3">
                Easy Ordering
              </h4>

              <p>
                Browse menu, add items to cart and
                place your order easily.
              </p>

            </div>

          </div>




          <div className="col-md-4">

            <div className="card shadow h-100 text-center p-4">

              <div className="fs-1">
                🍽
              </div>

              <h4 className="mt-3">
                Table Reservation
              </h4>

              <p>
                Reserve your favourite table before
                visiting our restaurant.
              </p>

            </div>

          </div>


        </div>

      </section>



      {/* Call To Action */}
      <section className="bg-light py-5">

        <div className="container text-center">

          <h2>
            Ready to Order?
          </h2>

          <p>
            Explore our delicious menu today.
          </p>


          <Link
            to="/menu"
            className="btn btn-primary"
          >
            View Menu
          </Link>


        </div>

      </section>


    </>
  );
}

export default Home;
