function StudentList({ students, role, onView }) {
  const handleStudentView = (student) => {
    if (role === "student") {
      const id = prompt("Re-enter your ID");
      const password = prompt("Enter your password");

      if (id === student.id && password === student.password) {
        onView(student);
      } else {
        alert("Invalid credentials!");
      }
    } else {
      onView(student);
    }
  };

  return (
    <div>
      <h3>Students List</h3>

      <table border="1" width="100%">
        <thead>
          <tr>
            <th>ID</th>
            <th>View</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>
                <button onClick={() => handleStudentView(student)}>
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StudentList;