import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { addToCart } from "../redux/slices/cartSlice";

function FoodCard({ item }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  const handleAddToCart = () => {
    if (!user) {
      toast.info("Please login to add items to cart.");
      navigate("/login");
      return;
    }

    dispatch(addToCart(item));
    toast.success("Item added to cart");
  };

  return (
    <div className="col-md-4 mb-4">
      <div className="card shadow h-100">

        <img
          src={`/images/${item.image}`}
          className="card-img-top"
          alt={item.name}
          style={{ height: "220px", objectFit: "cover" }}
          onError={(e) => {
            e.target.src =
              "https://via.placeholder.com/400x220?text=No+Image";
          }}
        />

        <div className="card-body">
          <h5>{item.name}</h5>

          <p>{item.description}</p>

          <h4 className="text-success">₹ {item.price}</h4>

          <span
            className={`badge ${
              item.available ? "bg-success" : "bg-danger"
            }`}
          >
            {item.available ? "Available" : "Not Available"}
          </span>
        </div>

        <div className="card-footer bg-white">
          <button
            className="btn btn-primary w-100"
            disabled={!item.available}
            onClick={handleAddToCart}
          >
            <i className="bi bi-cart-plus me-2"></i>
            Add To Cart
          </button>
        </div>

      </div>
    </div>
  );
}

export default FoodCard;
