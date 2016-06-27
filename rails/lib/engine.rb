module Specter
  class Engine < Rails::Engine

    isolate_namespace Specter

    paths['app/controllers'] << 'lib/controllers'
    paths['app/models'] << 'lib/models'
    paths['app/views'] << 'lib/views'
    paths['app/helpers'] << 'lib/helpers'
    paths['app/assets'] << 'lib/assets'
    paths['app/assets'] << '../'
    paths.add 'config/routes.rb', with: 'lib/routes.rb'

    initializer :test_path do
      if paths['test/javascript'].nil?
        paths.add 'test/javascript', with: Rails.root + 'test/javascript'
      end

      path = paths['test/javascript']
      path.glob = nil
    end

    initializer :assets do
      config.assets.precompile += %w(runner.js specter.js specter.css)
      Specter.javascripts ||= %w(application)
    end

  end
end
