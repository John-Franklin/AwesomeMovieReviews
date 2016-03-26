json.array!(@reviews) do |review|
  json.extract! review, :id, :movie, :email, :rating, :comment
  json.url review_url(review, format: :json)
end
