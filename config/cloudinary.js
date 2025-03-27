const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name:"ddgfykwjt",
  api_key:"984885397136126",
  api_secret:"yUll6a1wKVSBjQVZNRpQpYbqaFk"
});

module.exports = cloudinary;