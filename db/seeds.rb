# Author: Lucas Rodriguez
# Date Created: 4/16/16

# Populates the database with all of the bug images
Dir.glob("private/bug_images/*.png").each do |image|
  encoded_string = Base64.encode64(File.open(image, "rb").read)
  encoded_string = "data:image/png;base64," + encoded_string
  type = image.include?("head") ? "head" : "body"
  BugImage.create(body_part: type, image: encoded_string)
end
