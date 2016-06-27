class Specter::Test
  attr_reader :path

  def initialize(path)
    @path = path
  end

  def content
    @content ||= begin
      File.open(@path).read
    end
  end

  def name
    @path.basename('.*').to_s
  end

  def valid?
    @path.file?
  end

end
