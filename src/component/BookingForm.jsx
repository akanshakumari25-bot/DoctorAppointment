
import { useState, useEffect } from "react";

function BookingForm({ doctor, onBack }) {
  const [patientName, setPatientName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [reason, setReason] = useState("");

  const [appointment, setAppointment] = useState(null);
  const [showReview, setShowReview] = useState(false);
  const [savedAppointments, setSavedAppointments] = useState([]);
  const [error, setError] = useState("");

  const timeSlots = [
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "12:00 PM",
    "12:30 PM",
    "02:00 PM",
    "02:30 PM",
    "03:00 PM",
    "03:30 PM",
  ];

  useEffect(() => {
    function loadAppointments() {
      const saved = JSON.parse(
        localStorage.getItem("appointments") || "[]"
      );

      setSavedAppointments(saved);
    }

    loadAppointments();

    window.addEventListener("storage", loadAppointments);

    return () => {
      window.removeEventListener("storage", loadAppointments);
    };
  }, []);

  function isSlotBooked(slot) {
    return savedAppointments.some((item) => {
      return (
        String(item.doctorId) === String(doctor.id) &&
        item.date === date &&
        item.time === slot &&
        item.status !== "Cancelled"
      );
    });
  }

  // Review screen par jaane se pehle slot check karo
  function handleReview(e) {
    e.preventDefault();

    const saved = JSON.parse(
      localStorage.getItem("appointments") || "[]"
    );

    const alreadyBooked = saved.some((item) => {
      return (
        String(item.doctorId) === String(doctor.id) &&
        item.date === date &&
        item.time === time &&
        item.status !== "Cancelled"
      );
    });

    if (alreadyBooked) {
      setSavedAppointments(saved);
      setTime("");
      setError("Sorry! Ye slot already booked hai. Please doosra slot select karein.");
      return;
    }

    setError("");
    setShowReview(true);
  }

  // Final confirmation par hi appointment save hogi
  function handleConfirm() {
    const saved = JSON.parse(
      localStorage.getItem("appointments") || "[]"
    );

    // Final booking se pehle slot dobara check karo
    const alreadyBooked = saved.some((item) => {
      return (
        String(item.doctorId) === String(doctor.id) &&
        item.date === date &&
        item.time === time &&
        item.status !== "Cancelled"
      );
    });

    if (alreadyBooked) {
      setSavedAppointments(saved);
      setShowReview(false);
      setTime("");
      setError("Sorry! Ye slot abhi book ho gaya hai. Please doosra slot select karein.");
      return;
    }

    const newAppointment = {
      id: Date.now(),
      doctorId: doctor.id,
      doctorName: doctor.name,
      specialty: doctor.specialty,
      fee: doctor.fee,
      patientName,
      age,
      gender,
      phone,
      email,
      date,
      time,
      reason,
      status: "Confirmed",
    };

    const updatedAppointments = [...saved, newAppointment];

    localStorage.setItem(
      "appointments",
      JSON.stringify(updatedAppointments)
    );

    setSavedAppointments(updatedAppointments);
    setAppointment(newAppointment);
    setShowReview(false);
  }

  // Screen 3: Booking confirmation
  if (appointment) {
    return (
      <div className="booking-confirmation">
        <h1>✅ Appointment Confirmed!</h1>

        <p>Your appointment has been booked successfully.</p>

        <div className="appointment-summary">
          <p><strong>Appointment ID:</strong> {appointment.id}</p>
          <p><strong>Doctor:</strong> {appointment.doctorName}</p>
          <p><strong>Specialty:</strong> {appointment.specialty}</p>
          <p><strong>Patient:</strong> {appointment.patientName}</p>
          <p><strong>Date:</strong> {appointment.date}</p>
          <p><strong>Time:</strong> {appointment.time}</p>
          <p><strong>Consultation Fee:</strong> ₹{appointment.fee}</p>
        </div>

        <button type="button" onClick={() => window.print()}>
          Print Appointment
        </button>

        <button type="button" onClick={onBack}>
          Back to Doctor Details
        </button>
      </div>
    );
  }

  // Screen 2: Review appointment
  if (showReview) {
    return (
      <div className="booking-form review-screen">
        <h1>Review Your Appointment</h1>
        <p>Please check your details before confirming.</p>

        <div className="appointment-summary">
          <h2>Doctor Details</h2>
          <p><strong>Doctor:</strong> {doctor.name}</p>
          <p><strong>Specialty:</strong> {doctor.specialty}</p>
          <p><strong>Consultation Fee:</strong> ₹{doctor.fee}</p>

          <hr />

          <h2>Patient Details</h2>
          <p><strong>Name:</strong> {patientName}</p>
          <p><strong>Age:</strong> {age}</p>
          <p><strong>Gender:</strong> {gender}</p>
          <p><strong>Phone:</strong> {phone}</p>
          <p><strong>Email:</strong> {email}</p>

          <hr />

          <h2>Appointment Details</h2>
          <p><strong>Date:</strong> {date}</p>
          <p><strong>Time:</strong> {time}</p>
          <p><strong>Reason for Visit:</strong> {reason}</p>
        </div>

        {error && <p className="booking-error">{error}</p>}

        <div className="review-buttons">
          <button
            type="button"
            onClick={() => {
              setShowReview(false);
              setError("");
            }}
          >
            ← Edit Details
          </button>

          <button type="button" onClick={handleConfirm}>
            Confirm Appointment
          </button>
        </div>
      </div>
    );
  }

  // Screen 1: Patient details form
  return (
    <div className="booking-form">
      <button type="button" onClick={onBack}>
        Back to Doctor Details
      </button>

      <h1>Book Appointment</h1>

      <h2>{doctor.name}</h2>
      <p>Specialty: {doctor.specialty}</p>
      <p>Consultation Fee: ₹{doctor.fee}</p>

      {error && <p className="booking-error">{error}</p>}

      <form onSubmit={handleReview}>
        <label>Patient Name</label>
        <input
          type="text"
          value={patientName}
          onChange={(e) => setPatientName(e.target.value)}
          required
        />

        <label>Age</label>
        <input
          type="number"
          min="1"
          max="120"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
        />

        <label>Gender</label>
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          required
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        <label>Phone Number</label>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          pattern="[0-9]{10}"
          placeholder="10-digit phone number"
          required
        />

        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Appointment Date</label>
        <input
          type="date"
          min={new Date().toLocaleDateString("en-CA")}
          value={date}
          onChange={(e) => {
            setDate(e.target.value);
            setTime("");
            setError("");
          }}
          required
        />

        <label>Available Time Slots</label>

        <div className="time-slots">
          {timeSlots.map((slot) => {
            const booked = isSlotBooked(slot);

            return (
              <button
                key={slot}
                type="button"
                className={
                  booked
                    ? "booked-slot"
                    : time === slot
                    ? "selected-slot"
                    : ""
                }
                onClick={() => {
                  setTime(slot);
                  setError("");
                }}
                disabled={!date || booked}
              >
                {booked ? `${slot} - Booked` : slot}
              </button>
            );
          })}
        </div>

        {!date && (
          <p>Please select a date before choosing a time.</p>
        )}

        <label>Reason for Visit</label>
        <textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Describe your problem"
          required
        />

        <button type="submit" disabled={!time}>
          Review Appointment
        </button>
      </form>
    </div>
  );
}

export default BookingForm;
