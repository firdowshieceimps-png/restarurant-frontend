import React, { useState, useEffect } from "react";
import api from "../services/api";
import { toast } from "react-toastify";

function Reservations() {
  const [formData, setFormData] = useState({
    reservationDate: "",
    reservationTime: "",
    numberOfGuests: "",
  });

  const [tables, setTables] = useState([]);
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    fetchReservations();
  }, []);

  useEffect(() => {
    if (
      formData.reservationDate &&
      formData.reservationTime &&
      formData.numberOfGuests
    ) {
      fetchAvailableTables();
    }
  }, [
    formData.reservationDate,
    formData.reservationTime,
    formData.numberOfGuests,
  ]);

  const fetchReservations = async () => {
    try {
      const res = await api.get(
        "/reservations/my-reservations"
      );

      setReservations(res.data.data);
    } catch (error) {
      toast.error("Failed to load reservations");
    }
  };

  const fetchAvailableTables = async () => {
    try {
      const res = await api.get(
        `/tables/available?date=${formData.reservationDate}&time=${formData.reservationTime}&guests=${formData.numberOfGuests}`
      );

      setTables(res.data.data);
    } catch (error) {
      console.log(error);
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
      const res = await api.post(
        "/reservations",
        formData
      );

      toast.success(res.data.message);

      setFormData({
        reservationDate: "",
        reservationTime: "",
        numberOfGuests: "",
      });

      setTables([]);

      fetchReservations();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Reservation failed"
      );
    }
  };

  return (
    <div className="container mt-4">
      {/* Reservation Form */}
      <div className="card shadow p-4 mb-4">
        <h2 className="mb-4">
          Reserve a Table
        </h2>

        <div className="alert alert-info">
          The system will automatically assign
          the best available table based on the
          number of guests.
        </div>

        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-4 mb-3">
              <input
                type="date"
                name="reservationDate"
                className="form-control"
                value={formData.reservationDate}
                onChange={handleChange}
                min={
                  new Date()
                    .toISOString()
                    .split("T")[0]
                }
                required
              />
            </div>

            <div className="col-md-4 mb-3">
              <input
                type="time"
                name="reservationTime"
                className="form-control"
                value={formData.reservationTime}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-4 mb-3">
              <input
                type="number"
                name="numberOfGuests"
                className="form-control"
                placeholder="Number of Guests"
                value={formData.numberOfGuests}
                onChange={handleChange}
                min="1"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-success"
          >
            Reserve Table
          </button>
        </form>
      </div>

      {/* Available Tables */}
      {tables.length > 0 && (
        <div className="card shadow p-4 mb-4">
          <h3 className="mb-3">
            Available Tables
          </h3>

          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Table</th>
                <th>Capacity</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {tables.map((table) => (
                <tr key={table._id}>
                  <td>
                    Table {table.tableNumber}
                  </td>

                  <td>
                    {table.capacity} Guests
                  </td>

                  <td>
                    {table.available ? (
                      <span className="badge bg-success">
                        Available
                      </span>
                    ) : (
                      <span className="badge bg-danger">
                        Booked
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* My Reservations */}
      <div className="card shadow p-4">
        <h3 className="mb-3">
          My Reservations
        </h3>

        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Table</th>
              <th>Date</th>
              <th>Time</th>
              <th>Guests</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {reservations.map((reservation) => (
              <tr key={reservation._id}>
                <td>
                  {reservation.tableNumber}
                </td>

                <td>
                  {new Date(
                    reservation.reservationDate
                  ).toLocaleDateString()}
                </td>

                <td>
                  {reservation.reservationTime}
                </td>

                <td>
                  {reservation.numberOfGuests}
                </td>

                <td>
                  <span
                    className={`badge ${
                      reservation.status ===
                      "Booked"
                        ? "bg-success"
                        : reservation.status ===
                          "Cancelled"
                        ? "bg-danger"
                        : "bg-secondary"
                    }`}
                  >
                    {reservation.status}
                  </span>
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
