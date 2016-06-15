require "rake/testtask"

task default: %w[test]


namespace :test do
  desc 'Run JavaScript test in browser'
  task :javascript do
    root = Rails.root

    Dir.chdir File.expand_path("../../application", __FILE__) do
      require 'bundler/setup'
      ENV['RAILS_ENV'] ||= 'test'
      Bundler.require(:default, ENV['RAILS_ENV'])

      require "rails"

      %w(
        action_controller
        action_view
        sprockets
      ).each do |framework|
        begin
          require "#{framework}/railtie"
        rescue LoadError
        end
      end

      Rails.env = ENV['RAILS_ENV']
      require 'thin'
      require 'rails/commands/server'
      require_relative '../application/application'

      config = Rails.application.config.assets
      config.paths << (root + "test/javascript/").to_s

      server = Rails::Server.new
      server.options[:Port] ||= 3000
      server.options[:Host] ||= '0.0.0.0'
      server.options[:server] = 'thin'

      server.start
    end
  end

end


