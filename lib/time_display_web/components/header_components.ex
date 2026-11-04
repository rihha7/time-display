defmodule TimeDisplayWeb.HeaderComponents do
  use Phoenix.Component
  import TimeDisplayWeb.TimerComponents
  import TimeDisplayWeb.IconComponents, only: [check_icon: 1]

  def stopwatch(assigns) do
    ~H"""
    <section class="relative">
      <.timer_btn stopwatch />

      <div class="bg-(--beige) w-22 space-y-1.5">
        <.timer_display stopwatch />
        <.timer_controls stopwatch />
      </div>
    </section>
    """
  end


  def timer(assigns) do
    ~H"""
    <section class="relative">
      <.timer_btn />

      <div id="timer-input" class="hidden bg-(--beige) outline-[1.5px] outline-(--indigo-950)/70 px-0.5 rounded-[3px] items-center mb-2">
        <.timer_input type="minute" />
        <.timer_input type="second" />

        <button id="submit-input" class="bg-(--indigo-950)/25 hover:bg-(--indigo-950)/50 hover:text-white ease-hover ml-2.5 mr-px size-4.5 rounded-full">
          <.check_icon />
        </button>
      </div>

      <div class="bg-(--beige) w-16 mx-auto space-y-1.5">
        <.timer_display />
        <.timer_controls />
      </div>

      <div id="timer-complete" class="hidden bg-(--beige) absolute right-full whitespace-nowrap top-0 text-[0.7rem] border rounded-xs px-1 pt-[0.5px] mt-1">DONE: <span id="time-completed">00:00</span></div>
    </section>
    """
  end
end
