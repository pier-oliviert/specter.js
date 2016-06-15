module Specter
  class TestsController < Specter::ApplicationController
    layout false, only: [:run]

    def index
      @tests = Specter::Engine.paths['test/javascript'].existent.map do |file|
        Specter::Test.new(Pathname.new(file))
      end.select do |test|
        test.valid?
      end
    end

    def show
      file = Specter::Engine.paths['test/javascript'].existent.select do |file|
        Pathname.new(file).basename('.*').to_s === params[:id]
      end.first

      @test = Specter::Test.new(Pathname.new(file))
    end

    def run
      file = Specter::Engine.paths['test/javascript'].existent.select do |file|
        Pathname.new(file).basename('.*').to_s === params[:id]
      end.first

      @test = Specter::Test.new(Pathname.new(file))
    end
  end
end
