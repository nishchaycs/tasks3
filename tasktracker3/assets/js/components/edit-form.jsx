import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, FormGroup, Label, Input } from 'reactstrap';

import api from '../api'

function EditForm(params) {

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
      type: 'UPDATE_EDITFORM',
      data: data,
    };
    params.dispatch(action);
  }

  function clear(ev) {
    params.dispatch({type: 'CLEAR_EDIT_FORM'});
  }

  function submit() {
    api.edit_task(params.editform, parseInt(params.task[0].id));
    document.getElementById('backbtn').click();
  }
  let task = params.task[0];
  let users = _.map(params.users, (uu) => <option key={uu.id} value={uu.id}>{uu.name}</option>);
  return <div style={{padding: "4ex"}}>
    <FormGroup>
      <Label for="user_id">User</Label>
      <Input type="select" name="user_id" value={params.task[0].user.id} onChange={update}>
        <option></option>
        <option key={params.task[0].user.id} value={params.task[0].user.id}>
          {params.task[0].user.name}
        </option>
      </Input>
    </FormGroup>

    <FormGroup>
      <Label for="title">Title</Label>
      <Input type="text_input" name="title" value={params.editform.title} onChange={update}/>
    </FormGroup>

    <FormGroup>
      <Label for="description">Description</Label>
      <Input type="text_input" name="description" value={params.editform.description} onChange={update}/>
    </FormGroup>

    <FormGroup>
      <Label for="time_spent">Time Spent</Label>
      <Input type="number" min="0" step="15" name="time_spent" value={params.editform.time_spent} onChange={update}/>
    </FormGroup>

    <FormGroup check>
      <Label check>
        <Input type="checkbox" name="done" checked={params.editform.done} onChange={update}/>{' '}
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
  return { editform: state.editform };
}

export default connect(state2props)(EditForm);
