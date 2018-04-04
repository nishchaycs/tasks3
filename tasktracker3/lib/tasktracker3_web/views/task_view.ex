defmodule Tasktracker3Web.TaskView do
  use Tasktracker3Web, :view
  alias Tasktracker3Web.TaskView
  alias Tasktracker3Web.UserView

  def render("index.json", %{tasks: tasks}) do
    %{data: render_many(tasks, TaskView, "task.json")}
  end

  def render("show.json", %{task: task}) do
    %{data: render_one(task, TaskView, "task.json")}
  end

  def render("task.json", %{task: task}) do
    %{id: task.id,
      title: task.title,
      time_spent: task.time_spent,
      description: task.description,
      done: task.done,
      user: render_one(task.user, UserView, "user.json")}
  end
end
