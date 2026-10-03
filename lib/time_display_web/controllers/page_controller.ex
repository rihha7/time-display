defmodule TimeDisplayWeb.PageController do
  use TimeDisplayWeb, :controller

  def home(conn, _params) do
    render(conn, :home)
  end
end
