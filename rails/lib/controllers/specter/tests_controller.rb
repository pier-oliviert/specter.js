class Specter::TestsController < Specter::ApplicationController
  layout false, only: [:run]
  before_action :groups

  def index
  end

  def show
    @group = groups.select do |group|
      group.name.eql? params[:group]
    end.first

    if @group.nil?
      redirect_to :index and return
    end

    @test = @group.tests.select do |test|
      test.name.eql? params[:id]
    end.first
  end

  def run
    @test = groups.select do |group|
      group.name.eql? params[:group]
    end.first.tests.select do |test|
      test.name.eql? params[:id]
    end.first
  end

  protected

  def paths
    @paths ||= Specter::Engine.paths['test/javascript'].existent.map(&Pathname.method(:new))
  end

  def groups
    @groups ||= begin
      groups = []
      groups << Specter::Group.new do |group|
        paths.each do |path|
          group.add(path)
        end
      end

      paths.each do |path|
        Dir.glob(path + '**/*/').each do |dir|
          group = Specter::Group.new(Pathname.new(dir).relative_path_from(path))
          groups << group
        end
      end

      groups
    end
  end
end
