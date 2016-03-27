require "spec_helper"

describe ReviewsController do
  describe "routing" do

    it "routes to #index" do
      get("/reviews").should route_to("reviews#index")
    end
    # routing handled by frontend now.

  end
end
