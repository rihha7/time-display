defmodule TimeDisplayWeb.IconComponents do
  use Phoenix.Component

  def pause_icon(assigns) do
  ~H"""
  <svg class="mx-auto" width="8" height="9.2" viewBox="0 0 8 9" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect class="group-hover:fill-white group-hover:stroke-white" x="0.5" y="0.5" width="2.28571" height="8" rx="0.7" fill="#1E1A4D" stroke="#1E1A4D" stroke-linecap="round"/>
    <rect class="group-hover:fill-white group-hover:stroke-white" x="5.07227" y="0.5" width="2.28571" height="8" rx="0.7" fill="#1E1A4D" stroke="#1E1A4D" stroke-linecap="round"/>
  </svg>
  """
  end

  def resume_icon(assigns) do
  ~H"""
  <svg class="mx-auto ml-1" width="10" height="10" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path class="group-hover:fill-white group-hover:stroke-white" d="M2.48666 0.879315L6.96115 3.11656C7.69819 3.48508 7.69819 4.53689 6.96115 4.90541L2.48666 7.14266C1.68877 7.5416 0.75 6.9614 0.75 6.06935V1.95263C0.75 1.06057 1.68878 0.480374 2.48666 0.879315Z" stroke-width="1.15" stroke-linecap="round" stroke-linejoin="round" fill="#1E1A4D" stroke="#1E1A4D"/>
  </svg>
  """
  end

  def stop_icon(assigns) do
  ~H"""
  <div class="size-2 bg-indigo-950 rounded-[1px] mx-auto group-hover:bg-white"></div>
  """
  end
end
