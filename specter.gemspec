lib = File.expand_path('../rails/lib', __FILE__)
$:.unshift(lib) unless $LOAD_PATH.include?(lib)

require 'version'

Gem::Specification.new do |s|
  s.name        = 'specterjs'
  s.version     = Specter::VERSION
  s.summary     = 'Testing solution for JavaScript environment'

  s.required_ruby_version = '>= 2.0.0'

  s.license   = 'MIT'

  s.author        = 'Pier-Olivier Thibault'
  s.email         = 'pothibo@gmail.com'
  s.homepage      = 'http://pothibo.com'

  s.files         = `git ls-files -z`.split("\x0")
  s.files         += Dir['README.md']

  s.require_path  = 'rails/lib'

  s.add_runtime_dependency 'thin', '~> 1.6'
  s.add_runtime_dependency 'rails'

end

