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
    p1 = Comeonin.Argon2.hashpwsalt("password1")
    p2 = Comeonin.Argon2.hashpwsalt("password2")
    p3 = Comeonin.Argon2.hashpwsalt("password3")
    p4 = Comeonin.Argon2.hashpwsalt("password4")
    Repo.delete_all(User)
    a = Repo.insert!(%User{ name: "alice", email: "alice@example.com", password_hash: p1 })
    b = Repo.insert!(%User{ name: "bob", email: "bob@example.com", password_hash: p2 })
    c = Repo.insert!(%User{ name: "carol", email: "carol@example.com", password_hash: p3 })
    d = Repo.insert!(%User{ name: "dave", email: "dave@example.com", password_hash: p4 })

    Repo.delete_all(Task)
    Repo.insert!(%Task{ user_id: a.id, title: "Task 1", description: "Task for Alice", time_spent: 150, done: true })
    Repo.insert!(%Task{ user_id: b.id, title: "Task 1", description: "Task for Bob", time_spent: 120, done: true })
    Repo.insert!(%Task{ user_id: c.id, title: "Task 1", description: "Task for Carol", time_spent: 60, done: false })
    Repo.insert!(%Task{ user_id: d.id, title: "Task 1", description: "Task for Dave", time_spent: 45, done: false })
  end
end

Seeds.run
