import React from 'react';
import Task from './task';

export default function Feed(params) {

  let tasklist;
  if(params.token) {
    let mytasks = _.filter(params.tasks, (tt) => tt.user.id == params.token.user_id)
    console.log(mytasks);
    let tasks = _.map(mytasks, (pp) => <Task key={pp.id} task={pp} />);
    tasklist = <div>{ tasks }</div>;
  }
  else {
    tasklist = <div><h6>...Please Login or Register First</h6></div>;
  }
  return (
  	<div>{ tasklist }</div>);
}
