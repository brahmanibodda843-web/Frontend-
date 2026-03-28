import { useState } from "react";

function Login({ setUser, students }) {
  const [role, setRole] = useState("");
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!role) {
      alert("Please select login type");
      return;
    }

    setIsLoading(true);
    
    
    setTimeout(() => {
      if (role === "admin") {
        if (id === "admin" && password === "admin123") {
          setUser({ role: "admin" });
        } else {
          alert("Invalid Admin Credentials");
        }
      }

      if (role === "student") {
        const student = students.find(
          (s) => s.id === id && s.password === password
        );

        if (student) {
          setUser({ role: "student", student });
        } else {
          alert("Invalid Student Credentials");
        }
      }
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="login-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 14L9 21H15L12 14Z" fill="currentColor"/>
              <circle cx="12" cy="6" r="4" fill="currentColor"/>
            </svg>
          </div>
          <h1 className="login-title">Welcome Back</h1>
          <p className="login-subtitle">Sign in to access your dashboard</p>
        </div>

        <div className="login-form">
          <div className="form-group">
            <label className="form-label">Login Type</label>
            <div className="role-selector">
              <button
                className={`role-btn ${role === "admin" ? "active" : ""}`}
                onClick={() => setRole("admin")}
              >
                <span className="role-icon">👨‍💼</span>
                <span>Admin</span>
              </button>
              <button
                className={`role-btn ${role === "student" ? "active" : ""}`}
                onClick={() => setRole("student")}
              >
                <span className="role-icon">🎓</span>
                <span>Student</span>
              </button>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="id">
              {role === "admin" ? "Admin ID" : "Student ID"}
            </label>
            <input
              id="id"
              type="text"
              placeholder={role === "admin" ? "Enter admin ID" : "Enter student ID"}
              value={id}
              onChange={(e) => setId(e.target.value)}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
            />
          </div>

          <button
            onClick={handleLogin}
            disabled={isLoading || !role || !id || !password}
            className="login-btn"
          >
            {isLoading ? (
              <span className="loading-spinner"></span>
            ) : (
              <>
                <span>Sign In</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </>
            )}
          </button>

          <div className="demo-credentials">
            <p className="demo-title">Demo Credentials:</p>
            <div className="demo-info">
              <div className="demo-item">
                <strong>Admin:</strong> ID: admin, Password: admin123
              </div>
              <div className="demo-item">
                <strong>Student Examples:</strong><br/>
                • CSE101 / cse123<br/>
                • ECE101 / ece123<br/>
                • EEE101 / eee123<br/>
                • IT101 / it123<br/>
                • MECH101 / mech123
              </div>
              <div className="demo-item">
                <strong>ID Range:</strong> 101-135 for each branch<br/>
                <strong>Password Format:</strong> [branch in lowercase] + 123
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;