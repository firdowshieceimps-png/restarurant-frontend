import { useEffect, useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify";

function AdminFeedback() {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    fetchFeedback();
  }, []);

  const fetchFeedback = async () => {
    try {
      const response = await api.get("/feedback");
      setFeedbacks(response.data.data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load feedback");
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow">
        <div className="card-header bg-dark text-white">
          <h3 className="mb-0">Manage Feedback</h3>
        </div>

        <div className="card-body">
          <table className="table table-bordered table-hover">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Customer</th>
                <th>Email</th>
                <th>Rating</th>
                <th>Review</th>
                <th>Date</th>
              </tr>
            </thead>

            <tbody>
              {feedbacks.length > 0 ? (
                feedbacks.map((feedback, index) => (
                  <tr key={feedback._id}>
                    <td>{index + 1}</td>

                    <td>{feedback.customer.name}</td>

                    <td>{feedback.customer.email}</td>

                    <td>{"⭐".repeat(feedback.rating)}</td>

                    <td>{feedback.review}</td>

                    <td>
                      {new Date(feedback.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center">
                    No Feedback Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminFeedback;
