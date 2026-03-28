const generateStudents = (branchCode) => {
  let students = [];

  for (let i = 1; i <= 35; i++) {
    students.push({
      id: branchCode + (100 + i),
      name: branchCode + " Student " + i,
      branch: branchCode,
      cgpa: (6 + Math.random() * 4).toFixed(2),
      email: branchCode.toLowerCase() + i + "@college.com",
      phone: "90000" + (10000 + i),
      password: branchCode.toLowerCase() + "123",
      registeredCourses: [], // Add empty registered courses array
      courses: [] // Keep existing courses for backward compatibility
    });
  }

  return students;
};

const StudentsData = [
  ...generateStudents("CSE"),
  ...generateStudents("ECE"),
  ...generateStudents("EEE"),
  ...generateStudents("IT"),
  ...generateStudents("MECH"),
];

export default StudentsData;