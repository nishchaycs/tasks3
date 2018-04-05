import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider, connect } from 'react-redux';

import Nav from './nav';
import Feed from './feed';
import PostForm from './post-form';
import EditForm from './edit-form';
import RegisterUser from './register-user';

export default function tasktracker3_init(store) {
  ReactDOM.render(
    <Provider store={store}>
      <Tasktracker3 />
    </Provider>,
    document.getElementById('root'),
  );
}

let Tasktracker3 = connect((state) => state)((props) => {
  return (
    <Router>
      <div>
        <Nav />
        <Route path="/" exact={true} render={() =>
          <div>
            <h1>Your Feed</h1>
            <Feed tasks={props.tasks} />
          </div>
        } />
        <Route path="/newtask" exact={true} render={() =>
          <PostForm users={props.users} root={this} />
        } />
        <Route path="/users/:user_id" render={({match}) =>
          <Feed tasks={_.filter(props.tasks, (pp) =>
            match.params.user_id == pp.user.id )
          } />
        } />
        <Route path="/tasks/:taskid" exact={true} render={({match}) =>
          <EditForm task={_.filter(props.tasks, (pp) =>
            match.params.taskid == pp.id )} users={props.users} />
        } />
      <Route path="/register" exact={true} render={({match}) =>
          <RegisterUser />
        } />
      </div>
    </Router>
  );
});
