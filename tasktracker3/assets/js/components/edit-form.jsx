import React from 'react';
import { connect } from 'react-redux';
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

  function submit() {
    api.edit_task(params.editform, parseInt(params.task[0].id));
  }
  console.log(params);
  let task = params.task[0];
  let users = _.map(params.users, (uu) => <option key={uu.id} value={uu.id}>{uu.name}</option>);
  return <div style={{padding: "4ex"}}>
    <FormGroup>
      <Label for="user_id">User</Label>
      <Input type="select" name="user_id" value={params.editform.user_id} onChange={update}>
        <option></option>
        { users }
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
      <Button onClick={submit} color="primary">Submit</Button>
    </FormGroup>
  </div>;

}

function state2props(state) {
  console.log("rerender", state);
  return { editform: state.editform };
}

export default connect(state2props)(EditForm);
