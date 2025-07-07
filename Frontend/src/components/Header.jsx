import React from 'react'
import { Link } from 'react-router-dom'
import SearchStudent from './SearchStudents'

function Header() {
	return (
		<div className='container mt-3'>
			<div className='row align-items-center justify-content-between g-2 flex-wrap'>

				{/* Search Bar */}
				<div className='col-12 col-md-auto mb-2 mb-md-0'>
					<SearchStudent />
				</div>

				{/* Buttons */}
				<div className='col-12 col-md-auto text-center text-md-end'>
					<Link to='/students'>
						<button className='btn btn-success mx-2 my-1'>Student List</button>
					</Link>
					<Link to='/'>
						<button className='btn btn-success my-1'>Registration</button>
					</Link>
				</div>
				
			</div>
		</div>
	)
}

export default Header;
