class Specter::Group
  attr_reader :path
  attr_reader :tests

  def initialize(relative_path = nil)
    @tests = []
    @path = relative_path

    if relative_path
      Specter::Engine.paths['test/javascript'].existent.each do |base|
        add(Pathname.new(base) + relative_path)
      end
    end
  end

  def add(pathname)
    Dir.glob(pathname + '*.html').each do |file|
      test = Specter::Test.new(Pathname.new(file))
      if test.valid?
        @tests << test
      end
    end
  end

  def name
    name = path.to_s
    if name.blank?
      name = 'general'
    end
    name
  end
end
