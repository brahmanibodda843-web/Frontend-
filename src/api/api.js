const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

const branches = ['CSE', 'ECE', 'EEE', 'IT', 'MECH'];

export const api = {
  // Get all students (using users as mock students)
  getStudents: async () => {
    const response = await fetch(`${API_BASE_URL}/users`);
    if (!response.ok) throw new Error('Failed to fetch students');
    const users = await response.json();
    
    // Transform user data to student format with branch-based IDs from 101-135
    return users.map((user, index) => {
      const branch = branches[index % branches.length];
      const branchNumber = (index % 35) + 101; // Generate numbers 101-135
      
      return {
        id: `${branch}${branchNumber}`,
        name: user.name,
        email: user.email,
        phone: user.phone || `90000${1000 + index}`,
        branch: branch,
        cgpa: (6 + Math.random() * 4).toFixed(2),
        password: `${branch.toLowerCase()}123`,
        registeredCourses: [],
        courses: []
      };
    });
  },

  // Get student by ID
  getStudentById: async (id) => {
    const students = await api.getStudents();
    return students.find(student => student.id === id);
  },

  // Add new student
  addStudent: async (studentData) => {
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(studentData),
    });
    if (!response.ok) throw new Error('Failed to add student');
    return response.json();
  },

  // Update student
  updateStudent: async (id, studentData) => {
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(studentData),
    });
    if (!response.ok) throw new Error('Failed to update student');
    return response.json();
  },

  // Delete student
  deleteStudent: async (id) => {
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete student');
    return response.json();
  }
};
