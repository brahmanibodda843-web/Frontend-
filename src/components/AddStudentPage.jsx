import { useState } from "react";

function AddStudentPage({ branch, students, addStudent, goBack }) {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [cgpa, setCgpa] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = () => {
    if (!id || !name || !cgpa || !email || !phone) {
      alert("Fill all fields");
      return;
    }

    const existing = students.find((s) => s.id === id);

    if (existing) {
      alert("Student with this ID already exists!");
      return;
    }

    addStudent({
      id,
      name,
      branch,
      cgpa,
      email,
      phone,
      password: branch.toLowerCase() + "123"
    });

    alert("Student Added Successfully");
    goBack();
  };

  return (
    <div className="container">
      <div className="card">
        <h2 className="page-title">Add Student - {branch}</h2>

        <div className="form-group">
          <input
            placeholder="Student ID"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
        </div>

        <div className="form-group">
          <input
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <input
            placeholder="CGPA"
            value={cgpa}
            onChange={(e) => setCgpa(e.target.value)}
          />
        </div>

        <div className="form-group">
          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-group">
          <input
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div className="button-group">
          <button className="success-btn" onClick={handleSubmit}>
            Save Student
          </button>

          <button className="secondary-btn" onClick={goBack}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddStudentPage;