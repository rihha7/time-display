defmodule TimeDisplayWeb.FooterComponents do
  use Phoenix.Component

  def date_of_completion(assigns) do
    ~H"""
    <div class="font-spline-mono pb-px font-semibold tracking-wider text-[0.85rem]">
      <div class="underline decoration-wavy underline-offset-[2.5px] cursor-pointer text-black/90 decoration-indigo-950 hover:decoration-black/90 hover:text-indigo-950 transition-colors duration-200">completed:<time datetime="" class="select-all"> 02/10/2026</time></div>
    </div>
    """
  end

  def switch_clock_btns(assigns) do
    ~H"""
    <div class="flex space-x-1 font-semibold select-none">
      <a id="analog-btn" href="?clock=analog" class="hidden border-[1.5px] rounded-[3px] py-[0.5px] px-2.5 cursor-pointer border-black bg-white shadow-[2px_2px_0_black]
        hover:bg-black hover:text-[#A9D6C5] hover:shadow-[1.5px_1.5px_0_white,2px_2px_0_0.7px_black] ease-hover
    ">analog</a>

    <a id="digital-btn" href="?clock=digital" class="hidden border-[1.5px] rounded-[3px] py-[0.5px] px-2.5 cursor-pointer border-black bg-white shadow-[2px_2px_0_black]
        hover:bg-black hover:text-[#A9D6C5] hover:shadow-[1.5px_1.5px_0_white,2px_2px_0_0.7px_black] ease-hover
    ">digital</a>
    </div>
    """
  end
end
