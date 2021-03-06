import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Form, FormGroup, NavItem, Input, Button } from 'reactstrap';
import { connect } from 'react-redux';

import api from '../api';

let LoginForm = connect(({login}) => {return {login};})((props) => {
  function update(ev) {
    let tgt = $(ev.target);
    let data = {};
    data[tgt.attr('name')] = tgt.val();
    props.dispatch({
      type: 'UPDATE_LOGIN_FORM',
      data: data,
    });
  }

  function create_token(ev) {
    ev.preventDefault();
    api.submit_login(props.login);
    document.getElementById('feedpage').click();
  }

  return <div className="navbar-text">
    <Form inline>
      <FormGroup>
        <Input type="email" name="email" placeholder="Email"
               value={props.login.email} onChange={update} />
           </FormGroup> &nbsp;
      <FormGroup>
        <Input type="password" name="password" placeholder="password"
               value={props.login.password} onChange={update} />
      </FormGroup> &nbsp;
      <Button onClick={create_token}>Log In</Button> &nbsp;
      <Link to={"/register"} >Register</Link>
      <Link to={"/"} type="hidden" id="feedpage"></Link>
    </Form>
  </div>;
});

let Session = connect(({token}) => {return {token};})((props) => {
  function logout(ev) {
    props.dispatch({
      type: 'DELETE_TOKEN',
      token: null,
    });
    location.replace("/");
  }
  return <div className="navbar-text">
    <ul className="navbar-nav">
	  	<NavItem className="nav-item ml-auto active">
	  		<NavLink to="/" exact={false} activeClassName="active" className="nav-link">Feed</NavLink>
  		</NavItem>
	  	<NavItem className="nav-item ml-auto">
	  		<NavLink to="/newtask" exact={false} href="#" className="nav-link">New Task</NavLink>
  		</NavItem>
      <NavItem className="nav-item mr-auto">
        <p>Welcome, { props.token.name } | <Button onClick={logout}>Log Out</Button></p>
      </NavItem>
    </ul>
  </div>;
});


function Nav(props) {
  let session_info;

  if (props.token) {
    session_info = <Session token={props.token} />;
  }
  else {
    session_info = <LoginForm />
  }
  return (
  	<nav className="navbar navbar-expand-lg navbar-dark bg-primary">
	  <span className="navbar-brand">Tasktracker 3.0</span>
	  { session_info }
	</nav>
	);
}

function state2props(state) {
  return {
    token: state.token,
  };
}

export default connect(state2props)(Nav);
