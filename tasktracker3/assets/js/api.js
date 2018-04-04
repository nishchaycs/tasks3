import store from './store';

class TheServer {

	request_tasks() {
	    $.ajax("/api/v1/tasks", {
	      method: "get",
	      dataType: "json",
	      contentType: "application/json; charset=UTF-8",
	      success: (resp) => {
	        store.dispatch({
	          type: 'TASKS_LIST',
	          tasks: resp.data,
	        });
      	  },
	    });
	}

	request_users() {
	    $.ajax("/api/v1/users", {
	      method: "get",
	      dataType: "json",
	      contentType: "application/json; charset=UTF-8",
	      success: (resp) => {
	        store.dispatch({
	          type: 'USERS_LIST',
	          users: resp.data,
	        });
	      },
	    });
    }

    submit_post(data) {
	    $.ajax("/api/v1/tasks", {
	      method: "post",
	      dataType: "json",
	      contentType: "application/json; charset=UTF-8",
	      data: JSON.stringify({ task: data }),
	      success: (resp) => {
	        store.dispatch({
	          type: 'ADD_TASK',
	          task: resp.data,
	        });
	      },
	    });
	}

	delete_task(id) {
		$.ajax("/api/v1/tasks/"+id, {
			method: "delete",
			dataType: "json",
			contentType: "application/json; charset=UTF-8",
			success: (resp) => {
				store.dispatch({
					type: 'DELETE_TASK',
					taskid: id,
				});
			},
		});
	}

	initialize_edit_form(id){
    $.ajax("/api/v1/tasks/" + id, {
      method: "get",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: "",
      success: (resp) => {
        let taskd ={
          user_id: resp.data.user.id,
          title: resp.data.title,
          description: resp.data.description,
          done: resp.data.done,
          time_spent: resp.data.time_spent,
          task_id: resp.data.id
        };
        store.dispatch({type: 'INIT_EDIT_TASK', task: taskd});
      },
		});
	}

	edit_task(data, id) {
		console.log(id);
		console.log(data);
		$.ajax("/api/v1/tasks/"+id, {
			method: "put",
			dataType: "json",
			contentType: "application/json; charset=UTF-8",
			data: JSON.stringify({ task: data }),
			success: (resp) => {
				store.dispatch({
					type: 'EDIT_TASK',
					taskid: id,
					task: resp.data
				});
			},
		});
	}

}

export default new TheServer();
