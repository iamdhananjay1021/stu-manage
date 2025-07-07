import { configureStore } from '@reduxjs/toolkit'
import studentReducer from '../redux/slice/StudentSlice';


export const store = configureStore({
    reducer: {
        students: studentReducer,
    },
})