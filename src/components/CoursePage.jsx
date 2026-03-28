import { useState, useEffect } from "react";

function CoursePage({ student, updateStudent, role, goBack }) {

  // 🔥 Default Courses Based On Branch
  const defaultBranchCourses = {
    CSE: [
      "Data Structures",
      "DBMS",
      "Operating Systems",
      "Computer Networks",
      "Java Programming",
      "Software Engineering"
    ],
    ECE: [
      "Signals & Systems",
      "Digital Electronics",
      "Microprocessors",
      "Communication Systems",
      "VLSI Design",
      "Embedded Systems"
    ],
    EEE: [
      "Power Systems",
      "Electrical Machines",
      "Control Systems",
      "Power Electronics",
      "Renewable Energy",
      "Switchgear & Protection"
    ],
    IT: [
      "Cloud Computing",
      "Cyber Security",
      "Web Technologies",
      "Artificial Intelligence",
      "Data Analytics",
      "Mobile Application Development"
    ],
    MECH: [
      "Thermodynamics",
      "Fluid Mechanics",
      "Machine Design",
      "Manufacturing Technology",
      "Heat Transfer",
      "Robotics"
    ]
  };

  const [newCourse, setNewCourse] = useState("");
  const [courses, setCourses] = useState([]);

  // 🔥 Load Default Courses If Student Has No Courses
  useEffect(() => {
    if (student.courses && student.courses.length > 0) {
      setCourses(student.courses);
    } else {
      const branchCourses = defaultBranchCourses[student.branch] || [];
      setCourses(branchCourses);

      updateStudent({
        ...student,
        courses: branchCourses
      });
    }
  }, []);

  const addCourse = () => {
    if (!newCourse) return;

    const updatedCourses = [...courses, newCourse];
    setCourses(updatedCourses);

    updateStudent({
      ...student,
      courses: updatedCourses
    });

    setNewCourse("");
  };

  const deleteCourse = (index) => {
    const updatedCourses = courses.filter((_, i) => i !== index);
    setCourses(updatedCourses);

    updateStudent({
      ...student,
      courses: updatedCourses
    });
  };

  return (
    <div className="container">
      <div className="card">

        <h2>{student.name} - Completed Courses</h2>

        <table className="course-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Course Name</th>
              {role === "admin" && <th>Action</th>}
            </tr>
          </thead>
          <tbody>
            {courses.map((course, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{course}</td>
                {role === "admin" && (
                  <td>
                    <button
                      className="danger-btn"
                      onClick={() => deleteCourse(index)}
                    >
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>

        <br />

        {role === "admin" && (
          <>
            <input
              placeholder="Add New Course"
              value={newCourse}
              onChange={(e) => setNewCourse(e.target.value)}
            />
            <button className="success-btn" onClick={addCourse}>
              Add Course
            </button>
            <br /><br />
          </>
        )}

        <button className="secondary-btn" onClick={goBack}>
          Back
        </button>

      </div>
    </div>
  );
}

export default CoursePage;