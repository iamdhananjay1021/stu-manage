import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const StudentDetails = () => {
  const { id } = useParams();
  const [student, setStudent] = useState(null);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await fetch(`https://student-manage-6ikm.onrender.com/api/v1/student/${id}`);
        const data = await response.json();
        setStudent(data);
      } catch (error) {
        console.error("Failed to fetch student data", error);
      }
    };
    fetchStudent();
  }, [id]);

  if (!student) return (
    <div className="container mt-5 text-center">
      <div className="spinner-border text-primary" role="status" />
      <p className="mt-3">Loading Student Details...</p>
    </div>
  );

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8">
          <div className="card shadow-sm">
            <div className="card-body">
              <h3 className="card-title mb-4 text-center">Student Details</h3>
              <p><strong>Name:</strong> {student.name}</p>
              <p><strong>Email:</strong> {student.email}</p>
              <p><strong>Age:</strong> {student.age}</p>
              <p><strong>Course:</strong> {student.course}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDetails;
