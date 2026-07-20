import { useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify";

function Feedback() {
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/feedback", {
        rating,
        review,
      });

      toast.success(response.data.message);

      setRating(5);
      setReview("");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to submit feedback"
      );
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4 mx-auto" style={{ maxWidth: "600px" }}>
        <h2 className="text-center mb-4">⭐ Feedback</h2>

        <form onSubmit={handleSubmit}>

          <div className="mb-3">
            <label className="form-label">Rating</label>

            <select
              className="form-select"
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
            >
              <option value={5}>⭐⭐⭐⭐⭐ (5)</option>
              <option value={4}>⭐⭐⭐⭐ (4)</option>
              <option value={3}>⭐⭐⭐ (3)</option>
              <option value={2}>⭐⭐ (2)</option>
              <option value={1}>⭐ (1)</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Review</label>

            <textarea
              className="form-control"
              rows="4"
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="Write your feedback..."
              required
            />
          </div>

          <button className="btn btn-success w-100">
            Submit Feedback
          </button>

        </form>
      </div>
    </div>
  );
}

export default Feedback;