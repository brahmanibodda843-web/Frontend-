function StudentCard({ student, onView }) {
  return (
    <div style={{ border: "1px solid gray", padding: "10px", margin: "10px" }}>
      <p><b>ID:</b> {student.id}</p>
      <p><b>Name:</b> {student.name}</p>

      <button onClick={() => onView(student)}>View</button>
    </div>
  );
}

export default StudentCard;