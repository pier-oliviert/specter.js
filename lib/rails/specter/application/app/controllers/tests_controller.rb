class TestsController < ApplicationController
  layout false, only: [:run]

  def index
    @directories = Specter::Engine.paths['test/javascript'].existent.map do |dir|
      Pathname.new(dir)
    end.select do |dir|
      test = Specter::Test.new(Pathname.new(dir))
      test.valid?
    end
  end

  def show
    directory = Specter::Engine.paths['test/javascript'].existent.select do |dir|
      Pathname.new(dir).basename.to_s === params[:id]
    end.first

    @test = Specter::Test.new(Pathname.new(directory))
  end

  def run
    directory = Specter::Engine.paths['test/javascript'].existent.select do |dir|
      Pathname.new(dir).basename.to_s === params[:id]
    end.first

    @test = Specter::Test.new(Pathname.new(directory))

  end
end
