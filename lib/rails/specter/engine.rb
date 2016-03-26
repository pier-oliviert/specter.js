module Specter
  class Engine < Rails::Engine
      def paths
        @paths ||= begin
          paths = super
          paths["lib/tasks"] << "lib/rails/specter/tasks"
          paths.add "app/assets", with: "lib/javascript"
          paths.add "app/views", with: Rails.root + "test/javascript"
          paths.add "test/javascript", with: Rails.root + "test/javascript", glob: "*"
          paths
        end
      end
  end
end
