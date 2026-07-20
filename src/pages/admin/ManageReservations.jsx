import { useEffect, useState } from "react";
import api from "../../services/api";
import { toast } from "react-toastify";

function ManageReservations() {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      const res = await api.get("/reservations");
      setReservations(res.data.data);
    } catch (error) {
      toast.error("Failed to load reservations");
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const res = await api.put(`/reservations/${id}`, { status });

      toast.success(res.data.message);

      fetchReservations();
    } catch (error) {
      toast.error("Failed to update reservation");
    }
  };

  return (
    <div className="container mt-4">

      <div className="card shadow">

        <div className="card-header bg-dark text-white">
          <h3>Manage Reservations</h3>
        </div>

        <div className="card-body">

          <table className="table table-bordered table-hover">

            <thead className="table-dark">
              <tr>
                <th>Customer</th>
                <th>Table</th>
                <th>Date</th>
                <th>Time</th>
                <th>Guests</th>
                <th>Status</th>
                <th>Update</th>
              </tr>
            </thead>

            <tbody>

              {reservations.map((reservation) => (

                <tr key={reservation._id}>

                  <td>{reservation.customer?.name}</td>

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

                    <select
                      className="form-select"
                      value={reservation.status}
                      onChange={(e) =>
                        updateStatus(
                          reservation._id,
                          e.target.value
                        )
                      }
                    >
                      <option>Booked</option>
                      <option>Confirmed</option>
                      <option>Completed</option>
                      <option>Cancelled</option>
                    </select>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default ManageReservations;
