import React from 'react'
import { Link } from 'react-router-dom'
import './styles/Navbar.css'


export default function Navbar() {
	return (
		<div id="navbar-container">
			<Link to="/" className="link">Home</Link>
			<Link to="/entertainme" className="link">Entertainment</Link>
			<Link to="/entertainme/add" className="link">Add Entertainment</Link>
		</div>
	)
}
