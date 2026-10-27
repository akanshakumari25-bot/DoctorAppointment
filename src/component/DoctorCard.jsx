function DoctorCard({doctor, onViewDetails}){

    return(
        <div className="doctor-card">
            <img src={doctor.image} alt={doctor.name} className="doctor-image" />

            <h2>{doctor.name}</h2>
            <p> Specialty:  {doctor.specialty}  </p>
            <p>Fees: ₹{doctor.fee}</p>
            <p>Rating: ⭐ {doctor.rating}</p>
            <p>Address: {doctor.address}</p>
            <p>Status:{doctor.available ? "Available": "Unavailable"}</p>
            <button onClick={() => onViewDetails(doctor)}>View Details</button>



        </div>
    )

}
export default DoctorCard; 




