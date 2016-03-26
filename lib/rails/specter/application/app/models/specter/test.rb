module Specter
  class Test
    attr_reader :pathname
    def initialize(pathname)
      @pathname = pathname
    end

    def input
      File.open(@pathname + "input.html").read
    end

    def expected
      File.open(@pathname + "expected.html").read
    end

    def test
      File.open(@pathname + "test.js").read
    end

    def valid?
      File.exist?(@pathname + "input.html") &&
      File.exist?(@pathname + "expected.html") &&
      File.exist?(@pathname + "test.js")
    end
  end
end
