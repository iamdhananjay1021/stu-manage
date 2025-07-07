import { Routes, Route } from 'react-router-dom'
import './App.css'
import StudentList from "./components/StudentList";
import StudentDetails from "./components/StudentDetails";

import { ToastContainer } from 'react-toastify'
import Header from './components/Header';

import StudentRagistration from './components/StudentRagistration';



function App() {
  return (
    <>
      <div className='container'>
        <ToastContainer position="top-center" />
        <Header />
        <Routes>
          <Route path='/' element={<StudentRagistration />} />
          <Route path='/students' element={<StudentList />} />
          <Route path='/students/:id' element={<StudentDetails />} />
        </Routes>
      </div>
    </>
  )
}
export default App;
