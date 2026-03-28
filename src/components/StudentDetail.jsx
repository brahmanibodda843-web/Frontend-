import { useState } from "react";

function StudentDetail({
  student,
  role,
  deleteStudent,
  updateStudent,
  goBack,
  openTimetable,
  openCourse,
  setPage
}) {
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    id: student.id,
    name: student.name,
    branch: student.branch,
    cgpa: student.cgpa,
    email: student.email,
    phone: student.phone,
    password: student.password,
    courses: student.courses || []
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = () => {
    updateStudent(formData);
    setIsEditing(false);
  };

  return (
    <div className="container">
      <div className="card">

        <h2>Student Details</h2>

        {isEditing ? (
          <>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            <br /><br />

            <input
              name="cgpa"
              value={formData.cgpa}
              onChange={handleChange}
            />
            <br /><br />

            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <br /><br />

            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
            <br /><br />

            <button
              className="success-btn"
              onClick={handleSave}
            >
              Save
            </button>
          </>
        ) : (
          <>
            <p><b>ID:</b> {formData.id}</p>
            <p><b>Name:</b> {formData.name}</p>
            <p><b>Branch:</b> {formData.branch}</p>
            <p><b>CGPA:</b> {formData.cgpa}</p>
            <p><b>Email:</b> {formData.email}</p>
            <p><b>Phone:</b> {formData.phone}</p>

            <br />

            {/* 🔥 NEW MODULE BUTTONS */}
            <button
              className="primary-btn"
              onClick={openTimetable}
            >
              View Timetable
            </button>

            <button
              className="primary-btn"
              onClick={openCourse}
            >
              View Completed Courses
            </button>

            <button
              className="success-btn"
              onClick={() => setPage("registration")}
            >
              Register for Courses
            </button>

            <br /><br />

            {role === "admin" && (
              <>
                <button
                  className="primary-btn"
                  onClick={() => setIsEditing(true)}
                >
                  Edit
                </button>

                <button
                  className="danger-btn"
                  onClick={() => deleteStudent(formData.id)}
                >
                  Delete
                </button>
              </>
            )}
          </>
        )}

        <br /><br />

        <button
          className="secondary-btn"
          onClick={goBack}
        >
          Back
        </button>

      </div>
    </div>
  );
}

export default StudentDetail;