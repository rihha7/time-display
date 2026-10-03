defmodule TimeDisplay.Application do
  # See https://elixir.hexdocs.pm/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  @impl true
  def start(_type, _args) do
    children = [
      TimeDisplayWeb.Telemetry,
      {DNSCluster, query: Application.get_env(:time_display, :dns_cluster_query) || :ignore},
      {Phoenix.PubSub, name: TimeDisplay.PubSub},
      # Start a worker by calling: TimeDisplay.Worker.start_link(arg)
      # {TimeDisplay.Worker, arg},
      # Start to serve requests, typically the last entry
      TimeDisplayWeb.Endpoint
    ]

    # See https://elixir.hexdocs.pm/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: TimeDisplay.Supervisor]
    Supervisor.start_link(children, opts)
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  @impl true
  def config_change(changed, _new, removed) do
    TimeDisplayWeb.Endpoint.config_change(changed, removed)
    :ok
  end
end
