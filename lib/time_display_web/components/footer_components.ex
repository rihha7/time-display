defmodule TimeDisplayWeb.FooterComponents do
  use Phoenix.Component

  def date_of_completion(assigns) do
    ~H"""
    <div class="font-spline-mono pb-px px-3 font-semibold tracking-wider text-[0.85rem]">
      <div class="underline decoration-wavy underline-offset-[2.5px] cursor-pointer text-black/90 decoration-indigo-950 hover:decoration-black/90 hover:text-indigo-950 transition-colors duration-200">completed:<time datetime="" class="select-all"> 02/10/2026</time></div>
    </div>
    """
  end

  def switch_clock_btns(assigns) do
    ~H"""
    <div class="flex space-x-1">
      <a id="analog-btn" href="?clock=analog" class="hidden border-[1.5px] rounded-xs pt-[0.5px] pb-px px-2 bg-linear-to-br select-none cursor-pointer border-black/70 bg-white/15
             from-[#145277]/30 to-[#83d0cb] font-semibold
             hover:from-black hover:to-black hover:text-[#6bdfdb]
             transition-colors duration-200
        ">analog</a>

      <a id="digital-btn" href="?clock=digital" class="hidden border-[1.5px] rounded-xs pt-[0.5px] pb-px px-2 bg-linear-to-br select-none cursor-pointer border-black/70 
             from-[#145277]/30 to-[#83d0cb] font-semibold
             hover:from-black hover:to-black hover:text-[#6bdfdb]
             transition-colors duration-200
        ">digital</a>
    </div>
    """
  end
end
