import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const SearchStudents = () => {
  const [query, setQuery] = useState("");
  const [students, setStudents] = useState([]);

  const handleSearch = async () => {
    if (!query.trim()) return;
    try {
      const response = await fetch(`http://localhost:4000/api/v1/students/search?name=${query}`);
      const data = await response.json();
      setStudents(data.students);
      if (data.students.length === 0) {
        toast.error("No student found");
      }
    } catch (error) {
      toast.error("Search failed. Please try again.");
    }
  };

  return (
    <div className="w-100">
      {/* Search Input & Button */}
      <div className="row g-2 align-items-center mb-3">
        <div className="col-12 col-sm-8">
          <input
            type="text"
            className="form-control"
            placeholder="Enter student name"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
        </div>
        <div className="col-12 col-sm-4">
          <button className="btn btn-outline-primary w-100" onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>

      {/* Search Results */}
      <div className="bg-light p-2 rounded">
        {students?.length > 0 && (
          <ul className="list-group">
            {students.map((student) => (
              <li key={student._id} className="list-group-item">
                <Link to={`/students/${student._id}`} className="text-decoration-none">
                  {student.name}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SearchStudents;
