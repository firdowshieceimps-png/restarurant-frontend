import { useEffect, useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify";

function Reservations() {
  const [formData, setFormData] = useState({
    tableNumber: "",
    reservationDate: "",
    reservationTime: "",
    numberOfGuests: "",
  });

  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
     // const res = await api.get("/reservations/my");
      const res = await api.get("/reservations/my-reservations");
      setReservations(res.data.data);
    } catch (error) {
      toast.error("Failed to load reservations");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/reservations", formData);

      toast.success(res.data.message);

      setFormData({
        tableNumber: "",
        reservationDate: "",
        reservationTime: "",
        numberOfGuests: "",
      });

      fetchReservations();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Reservation failed"
      );
    }
  };

  const cancelReservation = async (id) => {
    try {
      await api.put(`/reservations/cancel/${id}`);

      toast.success("Reservation cancelled");

      fetchReservations();
    } catch (error) {
      toast.error("Unable to cancel reservation");
    }
  };

  return (
    <div className="container mt-4">

      <div className="card shadow p-4 mb-5">
        <h2 className="mb-4">Reserve a Table</h2>

        <form onSubmit={handleSubmit}>

          <div className="row">

            <div className="col-md-3 mb-3">
              <input
                type="number"
                name="tableNumber"
                className="form-control"
                placeholder="Table Number"
                value={formData.tableNumber}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-3 mb-3">
              <input
                type="date"
                name="reservationDate"
                className="form-control"
                value={formData.reservationDate}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-3 mb-3">
              <input
                type="time"
                name="reservationTime"
                className="form-control"
                value={formData.reservationTime}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-3 mb-3">
              <input
                type="number"
                name="numberOfGuests"
                className="form-control"
                placeholder="Guests"
                value={formData.numberOfGuests}
                onChange={handleChange}
                required
              />
            </div>

          </div>

          <button className="btn btn-success">
            Reserve Table
          </button>

        </form>

      </div>

      <div className="card shadow p-4">

        <h2 className="mb-4">My Reservations</h2>

        <table className="table table-bordered">

          <thead>

            <tr>
              <th>Table</th>
              <th>Date</th>
              <th>Time</th>
              <th>Guests</th>
              <th>Status</th>
              <th>Action</th>
            </tr>

          </thead>

          <tbody>

            {reservations.map((reservation) => (
              <tr key={reservation._id}>

                <td>{reservation.tableNumber}</td>

                <td>
                  {new Date(
                    reservation.reservationDate
                  ).toLocaleDateString()}
                </td>

                <td>{reservation.reservationTime}</td>

                <td>{reservation.numberOfGuests}</td>

                <td>
                  <span className="badge bg-primary">
                    {reservation.status}
                  </span>
                </td>

                <td>

                  {reservation.status === "Booked" && (
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() =>
                        cancelReservation(reservation._id)
                      }
                    >
                      Cancel
                    </button>
                  )}

                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default Reservations;