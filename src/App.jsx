import { useState } from "react";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import "./styles.css";

function App() {
  const [user, setUser] = useState(null);
  const [students, setStudents] = useState([]);

  return (
    <div>
      {user && <Navbar setUser={setUser} />}

      {!user ? (
        <Login setUser={setUser} students={students} />
      ) : (
        <Dashboard
          user={user}
          students={students}
          setStudents={setStudents}
        />
      )}
    </div>
  );
}

export default App;