
const express = require('express');
const app = express();
app.use(express.json());
let students = [
    {
        id: 201,
        rollNumber: "2500320101093",
        name: "Shivang Upadhyay",
        branch: "CSE",
        semester: 3,
        email: "shivang@xyz.com"
    },
    {
        id: 202,
        rollNumber: "2500320101094",
        name: "Shivansh Rathi",
        branch: "CSE",
        semester: 3,
        email: "shivansh@xyz.com"
    },
    {
        id: 203,
        rollNumber: "2500320101095",
        name: "Shvansh Bhatnagar",
        branch: "CSE",
        semester: 3,
        email: "shvansh@xyz.com"
    }
];
let nextId = 204;
// 1. GET ALL STUDENTS
app.get('/api/students', (req, res) => {
    res.status(200).json(students);
});
// 2. POST NEW STUDENT
app.post('/api/students', (req, res) => {
    const { rollNumber, name, branch, semester, email } = req.body;

    if (
        typeof rollNumber !== 'string' || !rollNumber.trim() ||
        typeof name !== 'string' || !name.trim() ||
        typeof branch !== 'string' || !branch.trim() ||
        typeof semester !== 'number' || !Number.isFinite(semester) ||
        typeof email !== 'string' || !email.trim()
    ) {
        return res.status(400).json({
            message: "Invalid input. All fields are required."
        });
    }

    if (students.some(s => s.rollNumber === rollNumber)) {
        return res.status(400).json({
            message: "Roll number already exists."
        });
    }

    const newStudent = {
        id: nextId++,
        rollNumber,
        name,
        branch,
        semester,
        email
    };

    students.push(newStudent);

    res.status(201).json(newStudent);
});

// 3. FILTER STUDENTS BY BRANCH
app.get('/api/students/filter', (req, res) => {
    const branch = req.query.branch;

    if (!branch) {
        return res.status(400).json({
            message: "Please provide branch."
        });
    }

    const result = students.filter(
        s => s.branch.toLowerCase() === branch.toLowerCase()
    );

    res.status(200).json(result);
});

// 4. GET STUDENT BY ID
app.get('/api/students/:id', (req, res) => {
    const id = Number(req.params.id);

    const student = students.find(s => s.id === id);

    if (!student) {
        return res.status(404).json({
            message: "Student not found."
        });
    }

    res.status(200).json(student);
});

// 5. PUT UPDATE STUDENT
app.put('/api/students/:id', (req, res) => {
    const id = Number(req.params.id);

    const index = students.findIndex(s => s.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: "Student not found."
        });
    }

    const { rollNumber, name, branch, semester, email } = req.body;

    if (
        typeof rollNumber !== 'string' || !rollNumber.trim() ||
        typeof name !== 'string' || !name.trim() ||
        typeof branch !== 'string' || !branch.trim() ||
        typeof semester !== 'number' || !Number.isFinite(semester) ||
        typeof email !== 'string' || !email.trim()
    ) {
        return res.status(400).json({
            message: "Invalid input. All fields are required."
        });
    }

    if (students.some(s => s.rollNumber === rollNumber && s.id !== id)) {
        return res.status(400).json({
            message: "Roll number already exists."
        });
    }

    students[index] = {
        id,
        rollNumber,
        name,
        branch,
        semester,
        email
    };

    res.status(200).json(students[index]);
});

// 6. DELETE STUDENT
app.delete('/api/students/:id', (req, res) => {
    const id = Number(req.params.id);

    const index = students.findIndex(s => s.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: "Student not found."
        });
    }

    students.splice(index, 1);

    res.status(200).json({
        message: "Student deleted successfully."
    });
});

// START SERVER
app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});