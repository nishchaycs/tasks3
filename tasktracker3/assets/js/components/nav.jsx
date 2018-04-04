import React from 'react';
import { NavLink } from 'react-router-dom';
import { NavItem } from 'reactstrap';

export default function Nav(props) {
  return (
  	<nav className="navbar navbar-expand-lg navbar-dark bg-primary">
	  <span className="navbar-brand">Tasktracker 3.0</span>
	  <ul className="navbar-nav mr-auto">
	  	<NavItem className="nav-item active">
	  		<NavLink to="/" exact={false} activeClassName="active" className="nav-link">Feed</NavLink>
  		</NavItem>
	  	<NavItem className="nav-item">
	  		<NavLink to="/newtask" exact={false} href="#" className="nav-link">New Task</NavLink>
  		</NavItem>
	  </ul>
	  <span className="navbar-text">user@example.com</span>
	</nav>	
	);
}