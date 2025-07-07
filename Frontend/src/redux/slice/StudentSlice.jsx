import { createSlice } from "@reduxjs/toolkit";


const StudentSlice = createSlice({
	name: "students",
	initialState: {
		students: []
	},
	reducers: {
		setStudents: (state, action) => {
			state.students = action.payload;
		},
		removeStudent: (state, action) => {
			state.students = state.students.filter((curStudent) => curStudent._id !== action.payload);
		}
	}
});

export const { setStudents, removeStudent } = StudentSlice.actions;
export default StudentSlice.reducer;