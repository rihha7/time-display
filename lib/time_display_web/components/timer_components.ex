defmodule TimeDisplayWeb.TimerComponents do
  use Phoenix.Component

  attr :stopwatch, :boolean, default: false

  def timer_btn(assigns) do
    ~H"""
    <button id={ "#{@stopwatch && "stopwatch" || "timer" }-btn"} class="ml-auto block select-none cursor-pointer border-[1.5px] px-1.5 rounded-[3px] bg-white shadow-[2px_2px_0] mb-1 ease-hover duration-50
      hover:border-indigo-950 hover:bg-indigo-950 hover:text-white hover:shadow-[1.5px_1.5px_0,1.7px_1.7px_0_0.7px_black]"><%= @stopwatch && "stopwatch" || "timer" %></button>
    """
  end


  attr :type, :string, required: true

  def timer_input(assigns) do
    ~H"""
    <input id={"#{@type}-input"} type="text" class="bg-white h-5 border rounded-[3px] pt-px w-6.75 pl-[0.5px] text-center placeholder:font-extrabold" maxlength="2" placeholder="00" inputmode="numeric">
    <p class={["select-none pl-0.5",
        @type == "minute" and "pt-px pr-1.5 text-[0.94rem] font-extrabold",
        @type == "second" and "pt-[0.5px] text-[0.98rem] font-black",
    ]}><%= if @type == "minute", do: "m", else: "s" %></p>
    """
  end



  attr :stopwatch, :boolean, default: false

  def timer_display(assigns) do
    ~H"""
    <div id={"#{@stopwatch and "stopwatch" || "timer"}-display"} class={["font-bold text-center tracking-widest rounded-full pt-[0.5px] mx-auto bg-indigo-950/15",
        @stopwatch and "mx-1" || "mt-1 w-15" ]}><%= if @stopwatch, do: "00:00:00", else: "00:00" %></div>
    """
  end




  attr :stopwatch, :boolean, default: false

  def timer_controls(assigns) do
    ~H"""
    <div class="w-full">
      <div id="timer-controls" class="w-fit mx-auto text-xs mt-2 justify-center gap-x-2 select-none">
        <button id="pause" class="cursor-pointer bg-indigo-950/20 rounded-full pl-[2.95px] pr-[1.8px] pt-[0.75px] pb-[0.25px] hover:bg-indigo-950/70 hover:text-white ease-hover">❚❚</button>

        <button id="resume" class="hidden cursor-pointer bg-indigo-950/20 rounded-full pl-[4.5px] pr-[1.25px] hover:bg-indigo-950/70 hover:text-white ease-hover">▶︎</button>

        <button id="stop" class="cursor-pointer bg-indigo-950/20 rounded-full pl-[3.15px] pr-[1.8px] hover:bg-indigo-950/70 hover:text-white ease-hover">◼</button>
      </div>
    </div>
    """
  end
end
