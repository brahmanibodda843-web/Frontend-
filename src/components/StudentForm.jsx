import { useState } from "react";

function StudentForm({ addStudent, branch }) {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [cgpa, setCgpa] = useState("");

  const handleSubmit = () => {
    if (!id || !name || !cgpa) {
      alert("Fill all fields!");
      return;
    }

    addStudent({
      id,
      name,
      branch,
      cgpa,
      password: branch.toLowerCase() + "123"
    });

    setId("");
    setName("");
    setCgpa("");
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <h3>Add Student</h3>

      <input placeholder="ID" value={id} onChange={(e) => setId(e.target.value)} />
      <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <input placeholder="CGPA" value={cgpa} onChange={(e) => setCgpa(e.target.value)} />

      <button onClick={handleSubmit}>Add</button>
    </div>
  );
}

export default StudentForm;