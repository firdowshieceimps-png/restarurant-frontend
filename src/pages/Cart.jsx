import { useDispatch, useSelector } from "react-redux";
import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
} from "../redux/slices/cartSlice";
import api from "../services/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cartItems } = useSelector((state) => state.cart);

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleCheckout = async () => {
    try {
      const orderData = {
        items: cartItems.map((item) => ({
          menuItem: item._id,
          quantity: item.quantity,
          price: item.price, // Important
        })),
        totalAmount: totalPrice,
      };

      console.log(orderData);

      const response = await api.post("/orders", orderData);

      toast.success(response.data.message);

      dispatch(clearCart());

      navigate("/orders");

    } catch (error) {
      console.error(error.response?.data);

      toast.error(
        error.response?.data?.message || "Checkout failed"
      );
    }
  };

  return (
    <div className="container mt-4">

      <h2 className="mb-4">🛒 Shopping Cart</h2>

      {cartItems.length === 0 ? (
        <div className="alert alert-warning">
          Your cart is empty.
        </div>
      ) : (
        <>
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="card mb-3 shadow"
            >
              <div className="row g-0">

                <div className="col-md-3">
                    {/* <img
                          src={`/images/${item.image}`}
                          alt={item.name}
                      /> */}
                  <img
                    src={`/images/${item.image}`}
                    alt={item.name}
                    className="img-fluid rounded-start"
                    style={{
                      height: "180px",
                      objectFit: "cover",
                    }}
                  />
                </div>

                <div className="col-md-9">

                  <div className="card-body">

                    <h4>{item.name}</h4>

                    <p>{item.description}</p>

                    <h5 className="text-success">
                      ₹ {item.price}
                    </h5>

                    <div className="d-flex align-items-center mt-3">

                      <button
                        className="btn btn-danger"
                        onClick={() =>
                          dispatch(decreaseQuantity(item._id))
                        }
                      >
                        -
                      </button>

                      <span className="mx-3 fs-5">
                        {item.quantity}
                      </span>

                      <button
                        className="btn btn-success"
                        onClick={() =>
                          dispatch(increaseQuantity(item._id))
                        }
                      >
                        +
                      </button>

                      <button
                        className="btn btn-outline-danger ms-4"
                        onClick={() =>
                          dispatch(removeFromCart(item._id))
                        }
                      >
                        Remove
                      </button>

                    </div>

                  </div>

                </div>

              </div>
            </div>
          ))}

          <div className="card shadow p-4">

            <h3>Total : ₹ {totalPrice}</h3>

            <button
              className="btn btn-success mt-3"
              onClick={handleCheckout}
            >
              Place Order
            </button>

          </div>
        </>
      )}

    </div>
  );
}

export default Cart;