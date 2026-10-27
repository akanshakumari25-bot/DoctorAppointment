import { useEffect, useState } from "react";
import DoctorList from "./component/DoctorList";
import DoctorDetails from "./component/DoctorDetails";
import Navbar from "./component/Navbar";
import MyAppointments from "./component/MyAppointments";
import AdminPanel from "./component/AdminPanel";
import HomePage from "./component/HomePage";
import Login from "./component/Login";
import Footer from "./component/Footer";

function App() {
  const [doctor, setDoctor] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [search, setSearch] = useState("");
  const [specialty, setSpecialty] = useState("All");
  const [availability, setAvailability] = useState("All");
  const [page, setPage] = useState("home");

  useEffect(() => {
    async function fetchDoctors() {
      try {
        const response = await fetch(
          "https://6adc399c9cae184827ad0e60.mockapi.io/doctors"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch doctors");
        }

        const data = await response.json();
        setDoctor(data);
      } catch (error) {
        console.log("Error fetching doctors:", error);
        setError("Unable to fetch doctors. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    fetchDoctors();
  }, []);

  const filterdoctor = doctor.filter((item) => {
    const matchName = (item.name || "")
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchSpecialty =
      specialty === "All" || item.specialty === specialty;

    const matchAvailability =
      availability === "All" ||
      (availability === "Available" && item.available === true) ||
      (availability === "Unavailable" && item.available === false);

    return matchName && matchSpecialty && matchAvailability;
  });

  function goHome() {
    setPage("home");
    setSelectedDoctor(null);
  }

  function goDoctors() {
    setPage("doctors");
    setSelectedDoctor(null);
  }

  function goAppointments() {
    setPage("appointments");
    setSelectedDoctor(null);
  }

  function goAdmin() {
    setPage("admin");
    setSelectedDoctor(null);
  }

  function goLogin() {
    setPage("login");
    setSelectedDoctor(null);
  }

  return (
    <>
      <Navbar
        onHome={goHome}
        onDoctors={goDoctors}
        onAppointments={goAppointments}
        onAdmin={goAdmin}
        onLogin={goLogin}
      />

      {page === "home" ? (
        <HomePage onFindDoctors={goDoctors} />
      ) : page === "login" ? (
        <Login
          onBack={goHome}
          onLoginSuccess={goDoctors}
        />
      ) : page === "appointments" ? (
        <MyAppointments />
      ) : page === "admin" ? (
        <AdminPanel />
      ) : (
        <div className="home-page">
          {selectedDoctor ? (
            <DoctorDetails
              doctor={selectedDoctor}
              onBack={() => setSelectedDoctor(null)}
            />
          ) : (
            <>
              <h1>Find Your Doctor</h1>
              <p className="page-subtitle">
                Find the right healthcare professional for your needs.
              </p>

              <div className="search-filter">
                <input
                  type="text"
                  placeholder="Search doctor by name..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />

                <select
                  value={specialty}
                  onChange={(e) => setSpecialty(e.target.value)}
                >
                  <option value="All">All Specialties</option>
                  <option value="Cardiologist">Cardiologist</option>
                  <option value="Dermatologist">Dermatologist</option>
                  <option value="Neurologist">Neurologist</option>
                  <option value="Dentist">Dentist</option>
                  <option value="Pediatrician">Pediatrician</option>
                </select>

                <select
                  value={availability}
                  onChange={(e) => setAvailability(e.target.value)}
                >
                  <option value="All">All Availability</option>
                  <option value="Available">Available</option>
                  <option value="Unavailable">Unavailable</option>
                </select>
              </div>

              {loading ? (
                <p>Loading doctors...</p>
              ) : error ? (
                <p className="error-message">{error}</p>
              ) : filterdoctor.length > 0 ? (
                <DoctorList
                  doctor={filterdoctor}
                  onViewDetails={setSelectedDoctor}
                />
              ) : (
                <p>No doctors found!</p>
              )}
            </>
          )}
        </div>
      )}

      <Footer
        onHome={goHome}
        onDoctors={goDoctors}
        onAppointments={goAppointments}
        onLogin={goLogin}
      />
    </>
  );
}

export default App;


