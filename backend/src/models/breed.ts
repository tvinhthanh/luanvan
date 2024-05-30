import mongoose from "mongoose";

const breedSchema = new mongoose.Schema({
    _id: String,
    name: String,
    img: String,
  });


  const Breed = mongoose.model("breed", breedSchema, "breed");
export default Breed;
