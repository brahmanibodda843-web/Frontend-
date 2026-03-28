import { useState } from "react";

function SearchStudent({ branchStudents, setSearchedStudent }) {
  const [searchId, setSearchId] = useState("");

  const handleSearch = () => {
    const result = branchStudents.find(
      (s) => s.id.toLowerCase() === searchId.toLowerCase()
    );

    if (result) {
      setSearchedStudent(result);
    } else {
      alert("Student not found in this branch");
      setSearchedStudent(null);
    }
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <input
        type="text"
        placeholder="Search by ID"
        value={searchId}
        onChange={(e) => setSearchId(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}

export default SearchStudent;