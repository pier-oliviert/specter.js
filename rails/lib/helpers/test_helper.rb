module TestHelper
  def run_test_path(group, test)
    url_for action: 'run', controller: 'tests', id: test.name, group: group.name
  end

  def test_path(group, test)
    url_for action: 'show', controller: 'tests', id: test.name, group: group.name
  end
end
