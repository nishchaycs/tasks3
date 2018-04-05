import React from 'react';
import { Button, FormGroup, Label, Input } from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import api from '../api'

function RegisterUser(params) {

  function update(ev) {
    let tgt = $(ev.target);

    let data = {};
    data[tgt.attr('name')] = tgt.val();
    let action = {
      type: 'UPDATE_USERFORM',
      data: data,
    };
    params.dispatch(action);
  }

  function register_user(ev) {
    api.registeruser(params.userform);
    document.getElementById('feedpage').click();
  }

  return <div style={{padding: "4ex"}}>
    <FormGroup>
      <Label for="name">User Name</Label>
      <Input type="text_input" name="name" value={params.userform.name}
        placeholder="User Name" onChange={update}/>
    </FormGroup>
    <FormGroup>
      <Label for="email">Email Id</Label>
      <Input type="email" name="email" value={params.userform.email}
        placeholder="Email" onChange={update} />
    </FormGroup>
    <FormGroup>
      <Label for="password">Password</Label>
      <Input type="password" name="password" value={params.userform.password}
        placeholder="Password" onChange={update} />
    </FormGroup>
      <Button onClick={register_user} color="primary">Register</Button>
      <Link to={"/"} type="hidden" id="feedpage"></Link>
    </div>;

}

function state2props(state) {
  return { userform: state.userform };
}

export default connect(state2props)(RegisterUser);
