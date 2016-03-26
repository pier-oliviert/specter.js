module Specter
  class Application < Rails::Application
    config.eager_load = false
    secrets.secret_key_base = "Something not so secret :)"
    config.logger = ActiveSupport::Logger.new(STDOUT)
    config.assets.debug = true
    config.assets.precompile += %w(specter runner test exec)

    config.assets.paths += Rails.application.paths['app/assets'].existent
    config.assets.paths += Specter::Engine.paths['app/assets'].existent
  end
end

