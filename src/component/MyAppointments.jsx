import { useState } from "react";

function MyAppointments() {
  const [appointments, setAppointments] = useState(() => {
    return JSON.parse(localStorage.getItem("appointments") || "[]");
  });

  const [editingId, setEditingId] = useState(null);
  const [newDate, setNewDate] = useState("");

  function cancelAppointment(id) {
    const updatedAppointments = appointments.map((appointment) =>
      appointment.id === id
        ? { ...appointment, status: "Cancelled" }
        : appointment
    );

    setAppointments(updatedAppointments);
    localStorage.setItem("appointments", JSON.stringify(updatedAppointments));
  }

  function rescheduleAppointment(id) {
    if (!newDate) {
      alert("Please select a new date.");
      return;
    }

    const updatedAppointments = appointments.map((appointment) =>
      appointment.id === id
        ? { ...appointment, date: newDate }
        : appointment
    );

    setAppointments(updatedAppointments);
    localStorage.setItem("appointments", JSON.stringify(updatedAppointments));

    setEditingId(null);
    setNewDate("");

    alert("Appointment rescheduled successfully!");
  }

  return (
    <div className="my-appointments">
      <h1>My Appointments</h1>

      {appointments.length === 0 ? (
        <p>No appointments booked yet.</p>
      ) : (
        appointments.map((appointment) => (
          <div className="appointment-card" key={appointment.id}>
            <h2>{appointment.doctorName}</h2>

            <p>Specialty: {appointment.specialty}</p>
            <p>Patient: {appointment.patientName}</p>
            <p>Date: {appointment.date}</p>
            <p>Time: {appointment.time || "Not selected"}</p>
            <p>Fee: ₹{appointment.fee}</p>
            <p>Status: {appointment.status}</p>

            {appointment.status === "Confirmed" && (
              <>
                <button
                  type="button"
                  onClick={() => cancelAppointment(appointment.id)}
                >
                  Cancel Appointment
                </button>

                {editingId === appointment.id ? (
                  <div>
                    <input
                      type="date"
                      value={newDate}
                      min={new Date().toLocaleDateString("en-CA")}
                      onChange={(e) => setNewDate(e.target.value)}
                    />

                    <button
                      type="button"
                      onClick={() => rescheduleAppointment(appointment.id)}
                    >
                      Save New Date
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setEditingId(null);
                        setNewDate("");
                      }}
                    >
                      Back
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      setEditingId(appointment.id);
                      setNewDate(appointment.date);
                    }}
                  >
                    Reschedule Appointment
                  </button>
                )}
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default MyAppointments;