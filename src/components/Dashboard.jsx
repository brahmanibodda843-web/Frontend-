import { useState, useEffect } from "react";
import StudentList from "./StudentList";
import SearchStudent from "./SearchStudent";
import StudentDetail from "./StudentDetail";
import AddStudentPage from "./AddStudentPage";
import TimetablePage from "./TimetablePage";
import CoursePage from "./CoursePage";
import CourseRegistration from "./CourseRegistration";
import { api } from "../api/api";

function Dashboard({ user, students, setStudents }) {
  const role = user?.role;

  const [branch, setBranch] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [page, setPage] = useState("home");
  const [loading, setLoading] = useState(true);

  // 🔥 For search filtering
  const [filteredStudents, setFilteredStudents] = useState([]);

  // Fetch students from API
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const apiStudents = await api.getStudents();
        setStudents(apiStudents);
      } catch (error) {
        console.error('Failed to fetch students:', error);
        // Fallback to empty array if API fails
        setStudents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [setStudents]);

  // Filter by branch
  const branchStudents = students.filter(
    (s) => s.branch === branch
  );

  // Decide which students to display
  const studentsToDisplay =
    filteredStudents.length > 0 ? filteredStudents : branchStudents;

  // Add student
  const addStudent = (newStudent) => {
    setStudents((prev) => [...prev, newStudent]);
    setPage("home");
  };

  // Delete student
  const deleteStudent = (id) => {
    setStudents((prev) => prev.filter((s) => s.id !== id));
    setSelectedStudent(null);
    setPage("home");
  };

  // Update student
  const updateStudent = (updatedStudent) => {
    setStudents((prev) =>
      prev.map((s) =>
        s.id === updatedStudent.id ? updatedStudent : s
      )
    );
  };

  // Add Student Page
  if (page === "add") {
    return (
      <AddStudentPage
        branch={branch}
        students={students}
        addStudent={addStudent}
        goBack={() => setPage("home")}
      />
    );
  }

  // Student Detail Page
  if (page === "detail" && selectedStudent) {
    return (
      <StudentDetail
        student={selectedStudent}
        role={role}
        deleteStudent={deleteStudent}
        updateStudent={updateStudent}
        goBack={() => {
          setSelectedStudent(null);
          setFilteredStudents([]); // reset search
          setPage("home");
        }}
        openTimetable={() => setPage("timetable")}
        openCourse={() => setPage("course")}
        setPage={setPage}
      />
    );
  }

  // Course Page
  if (page === "course") {
    return (
      <CoursePage
        student={selectedStudent}
        role={role}
        updateStudent={updateStudent}
        goBack={() => setPage("detail")}
      />
    );
  }

  // Timetable Page
  if (page === "timetable") {
    return (
      <TimetablePage
        branch={branch}
        role={role}
        goBack={() => setPage("detail")}
      />
    );
  }

  // Course Registration Page
  if (page === "registration" && selectedStudent) {
    return (
      <CourseRegistration
        student={selectedStudent}
        updateStudent={updateStudent}
        goBack={() => setPage("detail")}
      />
    );
  }

  // Loading state
  if (loading) {
    return (
      <div className="container">
        <div className="dashboard-card">
          <div className="loading-section">
            <div className="loading-spinner"></div>
            <p>Loading students data...</p>
          </div>
        </div>
      </div>
    );
  }

  // 🏠 HOME PAGE
  return (
    <div className="container">
      <div className="dashboard-card">
        <div className="dashboard-header">
          <div className="dashboard-title-section">
            <h2 className="dashboard-title">
              {role === "admin" ? "Admin Dashboard" : "Student Dashboard"}
            </h2>
            <p className="dashboard-subtitle">
              {role === "admin" 
                ? "Manage students, courses, and timetables" 
                : "View your academic details and information"}
            </p>
          </div>
          <div className="dashboard-icon">
            {role === "admin" ? (
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="currentColor"/>
                <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            ) : (
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 14L9 21H15L12 14Z" fill="currentColor"/>
                <circle cx="12" cy="6" r="4" fill="currentColor"/>
              </svg>
            )}
          </div>
        </div>

        <div className="dashboard-content">
          <div className="branch-section">
            <div className="section-header">
              <h3 className="section-title">Select Branch</h3>
              <div className="branch-selector-wrapper">
                <select
                  value={branch}
                  onChange={(e) => {
                    setBranch(e.target.value);
                    setSelectedStudent(null);
                    setFilteredStudents([]);
                  }}
                  className="branch-select"
                >
                  <option value="">Choose Branch</option>
                  <option value="CSE">Computer Science Engineering</option>
                  <option value="ECE">Electronics & Communication</option>
                  <option value="EEE">Electrical & Electronics</option>
                  <option value="IT">Information Technology</option>
                  <option value="MECH">Mechanical Engineering</option>
                </select>
              </div>
            </div>

            {branch && (
              <div className="branch-content">
                <div className="actions-section">
                  <div className="search-section">
                    <SearchStudent
                      branchStudents={branchStudents}
                      setSearchedStudent={(student) => {
                        if (student) {
                          setFilteredStudents([student]);
                        } else {
                          setFilteredStudents([]);
                        }
                      }}
                    />
                  </div>

                  {role === "admin" && (
                    <div className="admin-actions">
                      <button
                        className="add-student-btn"
                        onClick={() => setPage("add")}
                      >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        Add New Student
                      </button>
                    </div>
                  )}
                </div>

                <div className="students-section">
                  <StudentList
                    students={studentsToDisplay}
                    role={role}
                    onView={(student) => {
                      setSelectedStudent(student);
                      setPage("detail");
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;