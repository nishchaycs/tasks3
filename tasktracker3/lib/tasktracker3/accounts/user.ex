defmodule Tasktracker3.Accounts.User do
  use Ecto.Schema
  import Ecto.Changeset
  alias Tasktracker3.Accounts.User


  schema "users" do
    field :email, :string
    field :name, :string
    field :password_hash, :string
    field :password, :string, virtual: true

    timestamps()
  end

  @doc false
  def changeset(%User{} = user, attrs) do
    user
    |> cast(attrs, [:name, :email, :password_hash])
    |> validate_required([:name, :email])
  end
end
