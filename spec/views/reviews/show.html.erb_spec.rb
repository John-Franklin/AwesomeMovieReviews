require 'spec_helper'
#unused, so specs don't matter here.
describe "reviews/show" do
  before(:each) do
    @review = assign(:review, stub_model(Review,
      :movie => "Movie",
      :email => "Email",
      :rating => 1,
      :comment => "MyText"
    ))
  end

  it "renders attributes in <p>" do
    render
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    rendered.should match(/Movie/)
    rendered.should match(/Email/)
    rendered.should match(/1/)
    rendered.should match(/MyText/)
  end
end
