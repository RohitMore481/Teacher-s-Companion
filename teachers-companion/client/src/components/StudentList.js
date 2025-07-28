import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddStudentForm from './AddStudentForm';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [editStudentId, setEditStudentId] = useState(null);
  const [editData, setEditData] = useState({});

  const fetchStudents = async () => {
    const token = localStorage.getItem('token');
    const res = await axios.get('http://localhost:5000/api/students', {
      headers: { Authorization: `Bearer ${token}` },
    });
    setStudents(res.data);
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    await axios.delete(`http://localhost:5000/api/students/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchStudents();
  };

  const handleEdit = (student) => {
    setEditStudentId(student.id);
    setEditData(student);
  };

  const handleUpdate = async () => {
    const token = localStorage.getItem('token');
    await axios.put(`http://localhost:5000/api/students/${editStudentId}`, editData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setEditStudentId(null);
    fetchStudents();
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div className="student-list-bg">
      <style>
        {`
          .student-list-bg {
            min-height: 100vh;
            background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: flex-start;
            padding-top: 40px;
          }
          .student-list-container {
            background: #fff;
            padding: 2.5rem 2rem;
            border-radius: 16px;
            box-shadow: 0 8px 32px rgba(44, 62, 80, 0.2);
            width: 900px;
            max-width: 98vw;
            animation: fadeIn 1s ease;
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-top: 2rem;
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(30px);}
            to { opacity: 1; transform: translateY(0);}
          }
          .student-list-container h3 {
            margin-bottom: 1.5rem;
            color: #2575fc;
            font-weight: 700;
            letter-spacing: 1px;
            font-size: 2rem;
          }
          .student-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 1rem;
            background: #f8faff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 2px 8px rgba(44, 62, 80, 0.07);
          }
          .student-table th, .student-table td {
            padding: 0.85rem 1rem;
            text-align: left;
            font-size: 1rem;
          }
          .student-table th {
            background: linear-gradient(90deg, #6a11cb 0%, #2575fc 100%);
            color: #fff;
            font-weight: 600;
            border-bottom: 2px solid #e0e0e0;
          }
          .student-table tr {
            transition: background 0.2s;
          }
          .student-table tr:nth-child(even) {
            background: #f0f4ff;
          }
          .student-table tr:hover {
            background: #e3e9ff;
          }
          .student-table input {
            width: 100%;
            padding: 0.5rem 0.7rem;
            border: 1px solid #e0e0e0;
            border-radius: 6px;
            font-size: 1rem;
            transition: border 0.2s;
          }
          .student-table input:focus {
            border-color: #2575fc;
            outline: none;
          }
          .student-table button {
            margin-right: 0.5rem;
            padding: 0.4rem 0.9rem;
            border-radius: 6px;
            border: none;
            font-size: 1rem;
            font-weight: 500;
            cursor: pointer;
            transition: background 0.2s, color 0.2s;
          }
          .student-table button:first-child {
            background: linear-gradient(90deg, #6a11cb 0%, #2575fc 100%);
            color: #fff;
          }
          .student-table button:first-child:hover {
            background: linear-gradient(90deg, #2575fc 0%, #6a11cb 100%);
          }
          .student-table button:last-child {
            background: #fff;
            color: #2575fc;
            border: 2px solid #2575fc;
          }
          .student-table button:last-child:hover {
            background: #2575fc;
            color: #fff;
          }
        `}
      </style>
      <div className="student-list-container">
        <AddStudentForm onStudentAdded={fetchStudents} />
        <h3>Student List</h3>
        <table className="student-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Roll No</th>
              <th>Class</th>
              <th>Section</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((stu) => (
              <tr key={stu.id}>
                {editStudentId === stu.id ? (
                  <>
                    <td><input value={editData.name} onChange={(e) => setEditData({ ...editData, name: e.target.value })} /></td>
                    <td><input value={editData.rollNo} onChange={(e) => setEditData({ ...editData, rollNo: e.target.value })} /></td>
                    <td><input value={editData.className} onChange={(e) => setEditData({ ...editData, className: e.target.value })} /></td>
                    <td><input value={editData.section} onChange={(e) => setEditData({ ...editData, section: e.target.value })} /></td>
                    <td>
                      <button onClick={handleUpdate}>Save</button>
                      <button onClick={() => setEditStudentId(null)}>Cancel</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{stu.name}</td>
                    <td>{stu.rollNo}</td>
                    <td>{stu.className}</td>
                    <td>{stu.section}</td>
                    <td>
                      <button onClick={() => handleEdit(stu)}>Edit</button>
                      <button onClick={() => handleDelete(stu.id)}>Delete</button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default StudentList;