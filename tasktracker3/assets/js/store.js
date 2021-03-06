import { createStore, combineReducers } from 'redux';
import deepFreeze from 'deep-freeze';

function token(state = null, action) {
  switch (action.type) {
    case 'SET_TOKEN':
      return action.token;
    case 'DELETE_TOKEN':
      return action.token;
    default:
      return state;
  }
}

let empty_login = {
  email: "",
  password: "",
};

function login(state = empty_login, action) {
  switch (action.type) {
    case 'UPDATE_LOGIN_FORM':
      return Object.assign({}, state, action.data);
    default:
      return state;
  }
}

function tasks(state = [], action) {
  switch (action.type) {
  case 'TASKS_LIST':
    return [...action.tasks];
  case 'ADD_TASK':
    return [action.task, ...state];
  case 'DELETE_TASK':
    return state.filter(task => task.id !== action.taskid);
  case 'EDIT_TASK':
    let rmt = state.filter(task => task.id !== action.taskid);
    return [action.task, ...rmt];
  default:
    return state;
  }
}

function users(state = [], action) {
  switch (action.type) {
  case 'USERS_LIST':
    return [...action.users];
  case 'ADD_USER':
    return [action.user, ...state];
  default:
    return state;
  }
}

let empty_userform = {
  name: "",
  email: "",
  password: "",
}

function userform(state = empty_userform, action) {
  switch (action.type) {
    case 'UPDATE_USERFORM':
      return Object.assign({}, state, action.data);
    default:
      return state;
  }
}

let empty_form = {
  user_id: "",
  title: "",
  description: "",
  time_spent: 0,
  done: false,
};

function form(state = empty_form, action) {
  switch (action.type) {
    case 'UPDATE_FORM':
      return Object.assign({}, state, action.data);
    case 'CLEAR_POST_FORM':
      return empty_form;
    case 'SET_TOKEN':
      return Object.assign({}, state, action.token);
    default:
      return state;
  }
}

function editform(state = empty_form, action) {
  switch (action.type) {
    case 'UPDATE_EDITFORM':
      return Object.assign({}, state, action.data);
    case 'INIT_EDIT_TASK':
      return Object.assign({}, state, action.task);
    case 'CLEAR_EDIT_FORM':
      return empty_form;
    default:
      return state;
  }
}

function root_reducer(state0, action) {
  let reducer = combineReducers({tasks, users, form, editform, token, login, userform});
  let state1 = reducer(state0, action);
  console.log(state1);
  return deepFreeze(state1);
};

let store = createStore(root_reducer);
export default store;
