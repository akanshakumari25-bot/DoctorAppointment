import { useState } from "react";

function AdminPanel() {
  const [appointments, setAppointments] = useState(() => {
    return JSON.parse(localStorage.getItem("appointments") || "[]");
  });

  function updateStatus(id, newStatus) {
    const updatedAppointments = appointments.map((appointment) =>
      appointment.id === id
        ? { ...appointment, status: newStatus }
        : appointment
    );

    setAppointments(updatedAppointments);

    localStorage.setItem(
      "appointments",
      JSON.stringify(updatedAppointments)
    );
  }

  return (
    <div className="admin-panel">
      <h1>Admin Panel</h1>

      {appointments.length === 0 ? (
        <p>No appointments available.</p>
      ) : (
        appointments.map((appointment) => (
          <div className="appointment-card" key={appointment.id}>
            <h2>{appointment.doctorName}</h2>

            <p>Patient: {appointment.patientName}</p>
            <p>Appointment ID: {appointment.id}</p>
            <p>Date: {appointment.date}</p>
            <p>Time: {appointment.time || "Not selected"}</p>
            <p>Status: {appointment.status}</p>

            {appointment.status === "Confirmed" && (
              <>
                <button
                  type="button"
                  onClick={() =>
                    updateStatus(appointment.id, "Completed")
                  }
                >
                  Mark Completed
                </button>

                <button
                  type="button"
                  onClick={() =>
                    updateStatus(appointment.id, "Cancelled")
                  }
                >
                  Cancel Appointment
                </button>
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default AdminPanel;