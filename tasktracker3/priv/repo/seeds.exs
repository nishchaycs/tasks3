# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     Tasktracker3.Repo.insert!(%Tasktracker3.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.
defmodule Seeds do
  alias Tasktracker3.Repo
  alias Tasktracker3.Accounts.User
  alias Tasktracker3.Tracker.Task

  def run do
    Repo.delete_all(User)
    a = Repo.insert!(%User{ name: "alice", email: "alice@example.com" })
    b = Repo.insert!(%User{ name: "bob", email: "bob@example.com" })
    c = Repo.insert!(%User{ name: "carol", email: "carol@example.com" })
    d = Repo.insert!(%User{ name: "dave", email: "dave@example.com" })

    Repo.delete_all(Task)
    Repo.insert!(%Task{ user_id: a.id, title: "Task 1", description: "Task for Alice", time_spent: 150, done: true })
    Repo.insert!(%Task{ user_id: b.id, title: "Task 1", description: "Task for Bob", time_spent: 120, done: true })
    Repo.insert!(%Task{ user_id: c.id, title: "Task 1", description: "Task for Carol", time_spent: 60, done: false })
    Repo.insert!(%Task{ user_id: d.id, title: "Task 1", description: "Task for Dave", time_spent: 45, done: false })
  end
end

Seeds.run