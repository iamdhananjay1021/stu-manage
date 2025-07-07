import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setStudents, removeStudent } from "../redux/slice/StudentSlice";

const StudentList = () => {
	const dispatch = useDispatch();
	const students = useSelector((state) => state.students.students);

	const fetchStudents = async () => {
		try {
			const response = await fetch("https://student-manage-6ikm.onrender.com/api/v1/student");
			const data = await response.json();
			dispatch(setStudents(data.data));
		} catch (error) {
			console.error("Error fetching students:", error.message);
		}
	};

	const handleRemove = async (id) => {
		try {
			const response = await fetch("https://student-manage-6ikm.onrender.com/api/v1/student/delete", {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ id })
			});
			const data = await response.json();

			if (data.success) {
				toast.success(data.message);
				dispatch(removeStudent(data.data._id));
			} else {
				toast.error(data.message);
			}
		} catch (error) {
			console.error("Error removing student:", error.message);
		}
	};

	useEffect(() => {
		fetchStudents();
	}, []);

	return (
		<div className="container mt-4">
			<div className="row justify-content-center">
				<div className="col-12 col-lg-10">
					<div className="card shadow-sm p-4">
						<h2 className="text-center text-primary mb-4">Student List</h2>

						{students?.length > 0 ? (
							<div className="table-responsive">
								<table className="table table-bordered table-striped text-center align-middle">
									<thead className="table-success">
										<tr>
											<th>Name</th>
											<th>Age</th>
											<th>Email</th>
											<th>Course</th>
											<th>Action</th>
										</tr>
									</thead>
									<tbody>
										{students.map((student) => (
											<tr key={student._id}>
												<td>{student.name}</td>
												<td>{student.age}</td>
												<td>{student.email}</td>
												<td>{student.course}</td>
												<td>
													<button
														className="btn btn-outline-danger btn-sm"
														onClick={() => handleRemove(student._id)}
													>
														Remove
													</button>
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						) : (
							<h5 className="text-center text-muted mt-3">No records found</h5>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default StudentList;
