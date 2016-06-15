module Specter
  mattr_accessor :javascripts
end

if defined?(Rails)
  require 'engine'
end

