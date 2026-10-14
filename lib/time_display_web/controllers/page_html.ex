defmodule TimeDisplayWeb.PageHTML do
  @moduledoc """
  This module contains pages rendered by PageController.

  See the `page_html` directory for all templates available.
  """
  use TimeDisplayWeb, :html

  embed_templates "page_html/*"

  def timezone_city(assigns) do
    ~H"""
    <p id="timezone" class="font-spline-mono absolute bottom-full tracking-wider opacity-85 text-[0.9rem] select-none left-1/2 -translate-x-1/2 mb-1"></p>
    """
  end


  def digital_clock(assigns) do
    ~H"""
    <%= for segment <- ~w(hour : minute : second) do %>

      <%= if segment == ":" do %>
        <h1 class="-mt-1.5"><%= segment %></h1>

      <% else %>
        <div id={"#{segment}-segment"} class="relative [&:has(.hover-target:hover)>h1]:text-transparent [&:has(.hover-target:hover)>h1]:[-webkit-text-stroke:2.1px_black]">
          <div class="absolute hover-target left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 h-[4.5rem] cursor-pointer rounded-lg"></div>
          <h1 class="w-34.75 text-center">00</h1>
        </div>
      <% end %>

    <% end %>
    """
  end


  def time_period(assigns) do
    ~H"""
    <p id="time-period" class="absolute bottom-0 font-semibold opacity-75 text-[1.1rem] tracking-wider select-none left-1/2 -translate-x-1/2 mb-1">PM</p> <% # AM/PM/noon/midnight %>
    """
  end
end
