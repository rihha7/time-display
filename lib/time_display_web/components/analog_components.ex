defmodule TimeDisplayWeb.AnalogComponents do
  use Phoenix.Component

  def analog_clock_numbers(assigns) do
    ~H"""
    <div class="border-amber-200 numbers rounded-full absolute inset-0 flex flex-col items-center justify-center ml-3">
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
      <span class="absolute size-3 rounded-full bg-black origin-bottom left-1/2 ml-[1.2px] -translate-x-1/2 top-1/2 -translate-y-1/2 -mt-[0.5px] z-4"></span>
      <%= for hand <- ~w(hour-hand minute-hand second-hand) do %>
        <span id={hand} class={[
          "absolute w-0.75 rounded-full left-1/2 mb-[0.5px] bottom-1/2 origin-bottom",
          hand == "hour-hand" && "h-24 bg-black -ml-[0.5px] z-1",
          hand == "minute-hand" && "h-21 bg-[#7F7979] z-2",
          hand == "second-hand" && "w-[2px] h-25 bg-[#800000] z-3"
        ]}></span>
      <% end %>
    </div>
    """
  end

  def analog_digital_display(assigns) do
    ~H"""
    <div class="absolute font-space-grotesk font-bold tracking-wider opacity-60 inset-0 flex flex-col items-center justify-center mb-25 ml-1 rounded-full">
      <div id="digital-display" class="pt-px rounded-sm bg-black/30 w-17 text-center">00:00</div>
    </div>
    """
  end
end
