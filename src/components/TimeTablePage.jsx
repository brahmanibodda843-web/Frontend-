import { useState } from "react";

function TimetablePage({ branch, role, goBack }) {

  // 🔥 Default Weekly Structure (Table Format)
  const defaultTimetables = {
    CSE: {
      Monday: ["Data Structures", "DBMS", "OS", "Java"],
      Tuesday: ["CN", "SE", "Maths", "Python"],
      Wednesday: ["DBMS Lab", "OS Lab", "AI", "Cloud"],
      Thursday: ["ML", "Cyber Security", "Web Dev", "Mini Project"],
      Friday: ["Data Mining", "Java Lab", "Maths-II", "Seminar"],
      Saturday: ["Coding", "Library", "Sports", "Project"]
    },

    ECE: {
      Monday: ["Signals", "Digital Electronics", "Microprocessors", "Comm Systems"],
      Tuesday: ["VLSI", "Maths", "Network Theory", "Control Systems"],
      Wednesday: ["Embedded", "DSP", "Physics", "Lab"],
      Thursday: ["Analog Circuits", "Micro Lab", "Maths", "Seminar"],
      Friday: ["Comm Lab", "Electromagnetics", "Mini Project", "Library"],
      Saturday: ["Workshop", "Sports", "Project", "Coding"]
    },

    EEE: {
      Monday: ["Power Systems", "Machines", "Control Systems", "Electronics"],
      Tuesday: ["Maths", "Power Electronics", "Measurements", "Lab"],
      Wednesday: ["Electrical Machines Lab", "Physics", "Workshop", "Library"],
      Thursday: ["Renewable Energy", "Microcontrollers", "Seminar", "Maths"],
      Friday: ["Switchgear", "Project", "Lab", "Coding"],
      Saturday: ["Sports", "Mini Project", "Library", "Seminar"]
    },

    IT: {
      Monday: ["Cloud", "Data Analytics", "Web Tech", "Cyber Security"],
      Tuesday: ["AI", "ML", "Maths", "Python"],
      Wednesday: ["Big Data", "OS", "DBMS", "Lab"],
      Thursday: ["Mobile Dev", "UI/UX", "Seminar", "Project"],
      Friday: ["Coding", "Networking", "Library", "Mini Project"],
      Saturday: ["Sports", "Workshop", "Cloud Lab", "Practice"]
    },

    MECH: {
      Monday: ["Thermodynamics", "Fluid Mechanics", "Machine Design", "Maths"],
      Tuesday: ["Manufacturing", "Workshop", "Physics", "Project"],
      Wednesday: ["Heat Transfer", "CAD", "Lab", "Library"],
      Thursday: ["Dynamics", "Robotics", "Seminar", "Maths"],
      Friday: ["Production Tech", "Mini Project", "Coding", "Sports"],
      Saturday: ["Workshop", "Project", "Library", "Seminar"]
    }
  };

  const [timetable, setTimetable] = useState(
    defaultTimetables[branch] || {}
  );

  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (day, index, value) => {
    const updated = { ...timetable };
    updated[day][index] = value;
    setTimetable(updated);
  };

  return (
    <div className="container">
      <div className="card">

        <h2>{branch} Weekly Timetable</h2>

        <table className="timetable-table">
          <thead>
            <tr>
              <th>Day</th>
              <th>9:00 - 10:00</th>
              <th>10:00 - 11:00</th>
              <th>11:30 - 12:30</th>
              <th>1:30 - 2:30</th>
            </tr>
          </thead>

          <tbody>
            {Object.keys(timetable).map((day) => (
              <tr key={day}>
                <td><b>{day}</b></td>

                {timetable[day].map((subject, index) => (
                  <td key={index}>
                    {isEditing ? (
                      <input
                        value={subject}
                        onChange={(e) =>
                          handleChange(day, index, e.target.value)
                        }
                      />
                    ) : (
                      subject
                    )}
                  </td>
                ))}
              </tr>
            ))}

            {/* Sunday */}
            <tr>
              <td><b>Sunday</b></td>
              <td colSpan="4" style={{ color: "red", fontWeight: "bold" }}>
                🎉 Holiday
              </td>
            </tr>
          </tbody>
        </table>

        <br />

        {role === "admin" && (
          <button
            className="primary-btn"
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? "Save Timetable" : "Edit Timetable"}
          </button>
        )}

        <br /><br />

      </div>
      
      <div className="timetable-actions">
        <button className="secondary-btn" onClick={goBack}>
          ← Back to Student Details
        </button>
      </div>
    </div>
  );
}

export default TimetablePage;