import { useState, useEffect } from "react";

function CourseRegistration({ student, updateStudent, goBack }) {
  // 🔥 Available Courses Based On Branch
  const availableCourses = {
    CSE: [
      { id: "CS101", name: "Data Structures", credits: 4, type: "Core" },
      { id: "CS102", name: "DBMS", credits: 4, type: "Core" },
      { id: "CS103", name: "Operating Systems", credits: 4, type: "Core" },
      { id: "CS104", name: "Computer Networks", credits: 3, type: "Core" },
      { id: "CS105", name: "Java Programming", credits: 3, type: "Core" },
      { id: "CS106", name: "Software Engineering", credits: 3, type: "Core" },
      { id: "CS201", name: "Machine Learning", credits: 4, type: "Elective" },
      { id: "CS202", name: "Web Development", credits: 3, type: "Elective" },
      { id: "CS203", name: "Cloud Computing", credits: 3, type: "Elective" }
    ],
    ECE: [
      { id: "EC101", name: "Signals & Systems", credits: 4, type: "Core" },
      { id: "EC102", name: "Digital Electronics", credits: 4, type: "Core" },
      { id: "EC103", name: "Microprocessors", credits: 4, type: "Core" },
      { id: "EC104", name: "Communication Systems", credits: 3, type: "Core" },
      { id: "EC105", name: "VLSI Design", credits: 3, type: "Core" },
      { id: "EC106", name: "Embedded Systems", credits: 3, type: "Core" },
      { id: "EC201", name: "Digital Signal Processing", credits: 4, type: "Elective" },
      { id: "EC202", name: "Wireless Communication", credits: 3, type: "Elective" },
      { id: "EC203", name: "IoT Systems", credits: 3, type: "Elective" }
    ],
    EEE: [
      { id: "EE101", name: "Power Systems", credits: 4, type: "Core" },
      { id: "EE102", name: "Electrical Machines", credits: 4, type: "Core" },
      { id: "EE103", name: "Control Systems", credits: 4, type: "Core" },
      { id: "EE104", name: "Power Electronics", credits: 3, type: "Core" },
      { id: "EE105", name: "Renewable Energy", credits: 3, type: "Core" },
      { id: "EE106", name: "Switchgear & Protection", credits: 3, type: "Core" },
      { id: "EE201", name: "Smart Grid", credits: 4, type: "Elective" },
      { id: "EE202", name: "Electric Vehicles", credits: 3, type: "Elective" },
      { id: "EE203", name: "Energy Storage", credits: 3, type: "Elective" }
    ],
    IT: [
      { id: "IT101", name: "Cloud Computing", credits: 4, type: "Core" },
      { id: "IT102", name: "Cyber Security", credits: 4, type: "Core" },
      { id: "IT103", name: "Web Technologies", credits: 4, type: "Core" },
      { id: "IT104", name: "Artificial Intelligence", credits: 3, type: "Core" },
      { id: "IT105", name: "Data Analytics", credits: 3, type: "Core" },
      { id: "IT106", name: "Mobile Application Development", credits: 3, type: "Core" },
      { id: "IT201", name: "Blockchain Technology", credits: 4, type: "Elective" },
      { id: "IT202", name: "DevOps", credits: 3, type: "Elective" },
      { id: "IT203", name: "Big Data", credits: 3, type: "Elective" }
    ],
    MECH: [
      { id: "ME101", name: "Thermodynamics", credits: 4, type: "Core" },
      { id: "ME102", name: "Fluid Mechanics", credits: 4, type: "Core" },
      { id: "ME103", name: "Machine Design", credits: 4, type: "Core" },
      { id: "ME104", name: "Manufacturing Technology", credits: 3, type: "Core" },
      { id: "ME105", name: "Heat Transfer", credits: 3, type: "Core" },
      { id: "ME106", name: "Robotics", credits: 3, type: "Core" },
      { id: "ME201", name: "CAD/CAM", credits: 4, type: "Elective" },
      { id: "ME202", name: "Automotive Engineering", credits: 3, type: "Elective" },
      { id: "ME203", name: "3D Printing", credits: 3, type: "Elective" }
    ]
  };

  const [registeredCourses, setRegisteredCourses] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [totalCredits, setTotalCredits] = useState(0);

  // Load student's registered courses
  useEffect(() => {
    const studentCourses = student.registeredCourses || [];
    setRegisteredCourses(studentCourses);
    setSelectedCourses(studentCourses.map(course => course.id));
    calculateCredits(studentCourses);
  }, [student]);

  const calculateCredits = (courses) => {
    const total = courses.reduce((sum, course) => sum + course.credits, 0);
    setTotalCredits(total);
  };

  const toggleCourseSelection = (course) => {
    if (selectedCourses.includes(course.id)) {
      // Remove course
      setSelectedCourses(selectedCourses.filter(id => id !== course.id));
    } else {
      // Add course (check credit limit)
      if (totalCredits + course.credits <= 24) {
        setSelectedCourses([...selectedCourses, course.id]);
      } else {
        alert(`Cannot register for ${course.name}. You can only register for maximum 24 credits per semester.`);
      }
    }
  };

  const registerCourses = () => {
    if (selectedCourses.length === 0) {
      alert("Please select at least one course to register.");
      return;
    }

    const coursesToRegister = availableCourses[student.branch].filter(course => 
      selectedCourses.includes(course.id)
    );

    const updatedStudent = {
      ...student,
      registeredCourses: coursesToRegister
    };

    updateStudent(updatedStudent);
    setRegisteredCourses(coursesToRegister);
    calculateCredits(coursesToRegister);
    
    alert(`Successfully registered for ${coursesToRegister.length} courses! Total credits: ${totalCredits + coursesToRegister.reduce((sum, course) => sum + course.credits, 0)}`);
  };

  const dropCourse = (courseId) => {
    const updatedCourses = registeredCourses.filter(course => course.id !== courseId);
    setRegisteredCourses(updatedCourses);
    setSelectedCourses(selectedCourses.filter(id => id !== courseId));
    calculateCredits(updatedCourses);
    
    const updatedStudent = {
      ...student,
      registeredCourses: updatedCourses
    };
    updateStudent(updatedStudent);
  };

  const branchCourses = availableCourses[student.branch] || [];
  const currentSemesterCredits = registeredCourses.reduce((sum, course) => sum + course.credits, 0);

  return (
    <div className="container">
      <div className="card">
        <div className="registration-header">
          <h2>Course Registration - {student.name}</h2>
          <div className="registration-info">
            <p><strong>Branch:</strong> {student.branch}</p>
            <p><strong>Current Credits:</strong> {currentSemesterCredits}/24</p>
            <p><strong>Registered Courses:</strong> {registeredCourses.length}</p>
          </div>
        </div>

        <div className="registration-content">
          <div className="available-courses">
            <h3>Available Courses</h3>
            <div className="course-list">
              {branchCourses.map((course) => {
                const isRegistered = registeredCourses.some(rc => rc.id === course.id);
                const isSelected = selectedCourses.includes(course.id);
                
                return (
                  <div 
                    key={course.id} 
                    className={`course-item ${isRegistered ? 'registered' : ''} ${isSelected ? 'selected' : ''}`}
                  >
                    <div className="course-info">
                      <h4>{course.name}</h4>
                      <div className="course-details">
                        <span className="course-id">{course.id}</span>
                        <span className="course-type">{course.type}</span>
                        <span className="course-credits">{course.credits} credits</span>
                      </div>
                    </div>
                    <div className="course-actions">
                      {isRegistered ? (
                        <button 
                          className="danger-btn"
                          onClick={() => dropCourse(course.id)}
                        >
                          Drop
                        </button>
                      ) : (
                        <button 
                          className={`primary-btn ${isSelected ? 'selected' : ''}`}
                          onClick={() => toggleCourseSelection(course)}
                          disabled={currentSemesterCredits + course.credits > 24 && !isSelected}
                        >
                          {isSelected ? 'Selected' : 'Select'}
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="registration-summary">
            <h3>Registration Summary</h3>
            <div className="summary-content">
              <div className="selected-courses">
                <h4>Selected Courses ({selectedCourses.length})</h4>
                {selectedCourses.length > 0 ? (
                  <ul>
                    {branchCourses
                      .filter(course => selectedCourses.includes(course.id))
                      .map(course => (
                        <li key={course.id}>
                          {course.name} - {course.credits} credits
                        </li>
                      ))}
                  </ul>
                ) : (
                  <p>No courses selected</p>
                )}
              </div>
              
              <div className="credit-summary">
                <h4>Credit Summary</h4>
                <p><strong>Current Credits:</strong> {currentSemesterCredits}</p>
                <p><strong>Selected Credits:</strong> {
                  branchCourses
                    .filter(course => selectedCourses.includes(course.id))
                    .reduce((sum, course) => sum + course.credits, 0)
                }</p>
                <p><strong>Total After Registration:</strong> {
                  currentSemesterCredits + 
                  branchCourses
                    .filter(course => selectedCourses.includes(course.id))
                    .reduce((sum, course) => sum + course.credits, 0)
                }/24</p>
              </div>
              
              <button 
                className="success-btn register-btn"
                onClick={registerCourses}
                disabled={selectedCourses.length === 0}
              >
                Register for Selected Courses
              </button>
            </div>
          </div>
        </div>

        <div className="registration-actions">
          <button className="secondary-btn" onClick={goBack}>
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}

export default CourseRegistration;
