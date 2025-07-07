import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function StudentRegistration() {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		age: "",
		course: ""
	});

	const handleForm = (event) => {
		const { name, value } = event.target;
		setFormData(prev => ({ ...prev, [name]: value }));
	};

	const registerStudent = async (formData) => {
		try {
			const response = await fetch("http://localhost:4000/api/v1/registration", {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(formData)
			});
			const data = await response.json();
			if (data.success) {
				toast.success(data.message);
			} else {
				toast.error(data.message);
			}
		} catch (error) {
			console.error("Something went wrong", error.message);
			toast.error("Registration failed!");
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		registerStudent(formData);
		setFormData({ name: "", email: "", age: "", course: "" });
	};

	return (
		<div className="container d-flex align-items-center justify-content-center min-vh-100 bg-light">
			<div className="card shadow p-4 rounded-4 w-100" style={{ maxWidth: "450px" }}>
				<h3 className="text-center mb-4 text-success fw-bold">Student Registration</h3>
				<form onSubmit={handleSubmit}>
					<div className="mb-3">
						<label className="form-label fw-semibold">Name</label>
						<input
							type="text"
							name="name"
							className="form-control rounded-3"
							value={formData.name}
							onChange={handleForm}
							placeholder="Enter full name"
							required
						/>
					</div>
					<div className="mb-3">
						<label className="form-label fw-semibold">Email</label>
						<input
							type="email"
							name="email"
							className="form-control rounded-3"
							value={formData.email}
							onChange={handleForm}
							placeholder="example@email.com"
							required
						/>
					</div>
					<div className="mb-3">
						<label className="form-label fw-semibold">Age</label>
						<input
							type="number"
							name="age"
							className="form-control rounded-3"
							value={formData.age}
							onChange={handleForm}
							placeholder="18"
							required
						/>
					</div>
					<div className="mb-3">
						<label className="form-label fw-semibold">Course</label>
						<input
							type="text"
							name="course"
							className="form-control rounded-3"
							value={formData.course}
							onChange={handleForm}
							placeholder="e.g. B.Tech CSE"
							required
						/>
					</div>
					<button type="submit" className="btn btn-success w-100 rounded-3 fw-semibold">
						Register
					</button>
				</form>
			</div>
		</div>
	);
}

export default StudentRegistration;
