function SearchFilter({
  search,
  setSearch,
  specialty,
  setSpecialty,
  availability,
  setAvailability,
}) {
  return (
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
  );
}

export default SearchFilter;