defmodule TimeDisplayWeb.AnalogComponents do
  use Phoenix.Component

  def analog_clock_numbers(assigns) do
    ~H"""
    <div class="numbers rounded-full absolute inset-0 flex flex-col items-center justify-center ml-3">
      <%= for i <- 0..11 do %>
        <span style={"--i1: #{i}"} class={[
          i == 12 && "pt-0.75 text-left mr-2.5",
          i in [1, 3, 5] && "pl-0.5",
          i == 4 && "pt-0.5",
          i in [2, 6] && "pl-px",
          i == 2 && "-mt-px",
          i == [6, 7] && "pb-0.5",
          i == 8 && "pt-1"
        ]}><%= i == 0 && "12" || i %></span>
      <% end %>
    </div>
    """
  end



  def analog_clock_graduations(assigns) do
    ~H"""
    <div class="graduations absolute inset-0 flex flex-col items-center justify-center rounded-full">
      <%= for i <- 0..59 do %>
        <span style={"--i2: #{i}"} class={ rem(i, 5) == 0 && "stick" || "dot"}></span>
      <% end %>
    </div>
    """
  end



  def analog_clock_hands(assigns) do
    ~H"""
    <div class="hands absolute inset-0 rounded-full">
      <span class="absolute w-2 h-2 rounded-full bg-black origin-bottom left-1/2 ml-[1.2px] -translate-x-1/2 top-1/2 -translate-y-1/2 -mt-[0.5px] z-4"></span>
      <%= for hand <- ~w(hour-hand minute-hand second-hand) do %>
        <span id={hand} class={[
          "absolute w-0.75 rounded-full left-1/2 mb-[0.5px] bottom-1/2 origin-bottom",
          hand == "hour-hand" && "h-23 bg-black -ml-[0.5px] z-1",
          hand == "minute-hand" && "h-20 bg-black/65 z-2 rotate-90",
          hand == "second-hand" && "w-[2px] h-21 bg-[#800000] z-3 rotate-[calc(15*6)]"
        ]}></span>
      <% end %>
    </div>
    """
  end

end
