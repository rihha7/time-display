defmodule TimeDisplayWeb.PageControllerTest do
  use TimeDisplayWeb.ConnCase

  test "GET /", %{conn: conn} do
    conn = get(conn, ~p"/")
    assert html_response(conn, 200) =~ "<title>Time Display</title>"
  end
end
