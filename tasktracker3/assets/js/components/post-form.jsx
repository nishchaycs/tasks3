import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, FormGroup, Label, Input } from 'reactstrap';

import api from '../api'

function PostForm(params) {

  function update(ev) {
    let tgt = $(ev.target);

    let data = {};
    if(tgt.attr('name') == "done") {
      data["done"] = $(tgt).is(':checked') ? 'true' : 'false';
    }
    else {
      data[tgt.attr('name')] = tgt.val();
    }
    let action = {
      type: 'UPDATE_FORM',
      data: data,
    };
    params.dispatch(action);
  }

  function clear(ev) {
    params.dispatch({type: 'CLEAR_POST_FORM'});
  }

  function submit() {
    if(params.form.title == "" || params.form.description == "" || params.form.user == "" ||
      params.form.time_spent == "" || (Number(params.form.time_spent)%15 != 0)) {
        alert("Form Value(s) Incorrect!");
      }
    else {
      api.submit_post(params.form);
      clear();
      document.getElementById('backbtn').click();
    }
  }

  let users = _.map(params.users, (uu) => <option key={uu.id} value={uu.id}>{uu.name}</option>);
  return <div style={{padding: "4ex"}}>
    <FormGroup>
      <Label for="user_id">User</Label>
      <Input type="select" name="user_id" value={params.form.user_id} onChange={update}>
        <option></option>
        { users }
      </Input>
    </FormGroup>

    <FormGroup>
      <Label for="title">Title</Label>
      <Input type="text_input" name="title" value={params.form.title} onChange={update}/>
    </FormGroup>

    <FormGroup>
      <Label for="description">Description</Label>
      <Input type="text_input" name="description" value={params.form.description} onChange={update}/>
    </FormGroup>

    <FormGroup>
      <Label for="time_spent">Time Spent</Label>
      <Input type="number" min="0" step="15" name="time_spent" value={params.form.time_spent} onChange={update}/>
    </FormGroup>

    <FormGroup check>
      <Label check>
        <Input type="checkbox" name="done" checked={params.form.done} onChange={update}/>{' '}
        Done
      </Label>
    </FormGroup>

    <FormGroup>
      <Button onClick={submit} color="primary">Submit</Button> &nbsp;
      <Button onClick={clear}>Clear Form</Button>
    </FormGroup>
    <Link to = {"/"} id="backbtn">Back</Link>
  </div>;
}

function state2props(state) {
  return { form: state.form };
}

export default connect(state2props)(PostForm);
