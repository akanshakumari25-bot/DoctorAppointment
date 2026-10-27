import { useState } from "react";
import BookingForm from "./BookingForm";

function DoctorDetails({ doctor, onBack }) {
  const [showBooking, setShowBooking] = useState(false);

  return (
    <>
      {showBooking ? (
        <BookingForm
          doctor={doctor}
          onBack={() => setShowBooking(false)}
        />
      ) : (
        <div className="doctor-details">
          <button onClick={onBack}>Back to Doctors</button>

          <div className="details-card">
            <img
              src={doctor.image}
              alt={doctor.name}
              className="details-image"
            />

            <h1>{doctor.name}</h1>

            <p>
              <strong>Specialty:</strong> {doctor.specialty}
            </p>

            <p>
              <strong>Qualification:</strong> {doctor.qualification}
            </p>

            <p>
              <strong>Rating:</strong> ⭐ {doctor.rating}
            </p>

            <p>
              <strong>Address:</strong> {doctor.address}
            </p>

            <p>
              <strong>Consultation Fee:</strong> ₹{doctor.fee}
            </p>

            <p>
              <strong>About Doctor:</strong> {doctor.bio}
            </p>

            <p>
              <strong>Available Days:</strong> {doctor.days}
            </p>

            <p>
              <strong>Consultation Hours:</strong> {doctor.hours}
            </p>

            <p>
              <strong>Status:</strong>{" "}
              <span className={doctor.available ? "available" : "unavailable"}>
                {doctor.available ? "Available" : "Unavailable"}
              </span>
            </p>

            <button
              onClick={() => setShowBooking(true)}
              disabled={!doctor.available}
            >
              Book Appointment
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default DoctorDetails;