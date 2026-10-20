defmodule TimeDisplayWeb.HeaderComponents do
  use Phoenix.Component
  import TimeDisplayWeb.TimerComponents

  def stopwatch(assigns) do
    ~H"""
    <section class="relative">
      <.timer_btn stopwatch />

      <div class="absolute mt-1 w-full bg-[#F2E8D5]">
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

      <div id="timer-input" class="hidden bg-[#F2E8D5] outline-[1.5px] outline-indigo-950/70 px-0.5 rounded-[3px] items-center mb-1">
        <.timer_input type="minute" />
        <.timer_input type="second" />

        <button id="submit-input" class="select-none cursor-pointer bg-indigo-950/15 hover:bg-indigo-950/70 hover:text-white ease-hover ml-3 pl-[4.5px] pr-[4.5px] rounded-full">✔</button>
      </div>

      <div id="timer-tooltip" class="hidden left-1/2 -translate-x-1/2 pr-1 absolute w-max bg-[#F2E8D5]">
        <.timer_display />
        <.timer_controls />
      </div>

      <div id="timer-complete" class="hidden bg-[#F2E8D5] absolute right-full whitespace-nowrap top-0 text-[0.7rem] border rounded-xs mx-auto px-1 pt-[0.5px] mt-1 mr-2">DONE: <span id="time-completed">00:00</span></div>
    </section>
    """
  end
end
