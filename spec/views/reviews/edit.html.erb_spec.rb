require 'spec_helper'
#unused, so specs don't matter here.
describe "reviews/edit" do
  before(:each) do
    @review = assign(:review, stub_model(Review,
      :movie => "MyString",
      :email => "MyString",
      :rating => 1,
      :comment => "MyText"
    ))
  end

  it "renders the edit review form" do
    render

    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "form[action=?][method=?]", review_path(@review), "post" do
      assert_select "input#review_movie[name=?]", "review[movie]"
      assert_select "input#review_email[name=?]", "review[email]"
      assert_select "input#review_rating[name=?]", "review[rating]"
      assert_select "textarea#review_comment[name=?]", "review[comment]"
    end
  end
end
