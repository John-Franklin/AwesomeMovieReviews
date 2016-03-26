class Review < ActiveRecord::Base
  validates :movie, presence:true
  validates :email, format: {with: /.+@.+\..+/ , message:"Email provided is not a valid email."}
  validates :rating, numericality: {:greater_than_or_equal_to => 1, :less_than_or_equal_to => 5}
end
