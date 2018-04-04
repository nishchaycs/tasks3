import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, Button } from 'reactstrap';

import api from '../api'

export default function Task(params) {

  function deleteTask(ev, taskid) {
    api.delete_task(taskid);
  }
  function editTask(ev) {
    api.initialize_edit_form(params.task.id);
  }
  let task = params.task;
  return (<Card>
    <CardBody>
      <div>
        <p>Task for <b>{ task.user.name }</b></p>
        <p>Title: { task.title }</p>
        <p>Description: { task.description }</p>
        <p>Done: { String(task.done) }</p>
        <p>Time Spent: { task.time_spent }</p>
        <Link to={"/tasks/"+ task.id} onClick={editTask}>Edit</Link> &nbsp;
        <Button onClick={(ev) => deleteTask(ev, task.id)}>Delete</Button>
      </div>
    </CardBody>
  </Card>);
}
