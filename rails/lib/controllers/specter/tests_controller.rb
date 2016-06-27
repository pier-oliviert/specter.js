class Specter::TestsController < Specter::ApplicationController
  layout false, only: [:run]

  def index
    @groups = []
    @groups += paths.map(&Specter::Group.method(:new))

    paths.each do |path|
      Dir.glob(path + '**/*/').each do |dir|
        group = Specter::Group.new(path, dir)
        group.name = dir.sub path.to_s, ''
        @groups << group
      end
    end
  end

  def show
    file = paths.select do |file|
      path = Pathname.new(file) + params[:id]
      path.exist?
    end.first

    @test = Specter::Test.new(Pathname.new(file))
  end

  def run
    file = paths.select do |file|
      path = Pathname.new(file) + params[:id] + '.html'
      path.exist?
    end.first

    @test = Specter::Test.new(Pathname.new(file) + params[:id] + '.html')
  end

  protected

  def paths
    @paths ||= Specter::Engine.paths['test/javascript'].existent.map(&Pathname.method(:new))
  end
end
