import React, { useState } from 'react';
import axios from 'axios';

const AddStudentForm = ({ onStudentAdded }) => {
  const [student, setStudent] = useState({
    name: '',
    rollNo: '',
    className: '',
    section: '',
  });

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/students', student, {
        headers: { Authorization: `Bearer ${token}` },
      });
      onStudentAdded();
      setStudent({ name: '', rollNo: '', className: '', section: '' });
    } catch (error) {
      alert('Failed to add student');
    }
  };

  return (
    <div className="add-student-bg">
      <style>
        {`
          .add-student-bg {
            min-height: 100vh;
            background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .add-student-container {
            background: #fff;
            padding: 2.5rem 2rem;
            border-radius: 16px;
            box-shadow: 0 8px 32px rgba(44, 62, 80, 0.2);
            width: 350px;
            animation: fadeIn 1s ease;
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(30px);}
            to { opacity: 1; transform: translateY(0);}
          }
          .add-student-container h3 {
            margin-bottom: 1.5rem;
            color: #2575fc;
            font-weight: 700;
            letter-spacing: 1px;
          }
          .add-student-container input {
            width: 100%;
            padding: 0.75rem 1rem;
            margin-bottom: 1rem;
            border: 1px solid #e0e0e0;
            border-radius: 8px;
            font-size: 1rem;
            transition: border 0.2s;
          }
          .add-student-container input:focus {
            border-color: #2575fc;
            outline: none;
          }
          .add-student-container button[type="submit"] {
            width: 100%;
            padding: 0.75rem;
            background: linear-gradient(90deg, #6a11cb 0%, #2575fc 100%);
            color: #fff;
            border: none;
            border-radius: 8px;
            font-size: 1.1rem;
            font-weight: 600;
            cursor: pointer;
            transition: background 0.2s;
            margin-bottom: 0.5rem;
          }
          .add-student-container button[type="submit"]:hover {
            background: linear-gradient(90deg, #2575fc 0%, #6a11cb 100%);
          }
        `}
      </style>
      <div className="add-student-container">
        <h3>Add New Student</h3>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <input
            name="name"
            placeholder="Name"
            onChange={handleChange}
            value={student.name}
            required
          />
          <input
            name="rollNo"
            placeholder="Roll No"
            onChange={handleChange}
            value={student.rollNo}
            required
          />
          <input
            name="className"
            placeholder="Class"
            onChange={handleChange}
            value={student.className}
            required
          />
          <input
            name="section"
            placeholder="Section"
            onChange={handleChange}
            value={student.section}
            required
          />
          <button type="submit">Add Student</button>
        </form>
      </div>
    </div>
  );
};

export default AddStudentForm;