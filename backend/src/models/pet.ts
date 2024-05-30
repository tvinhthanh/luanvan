import mongoose from "mongoose";


const petSchema = new mongoose.Schema({
    _id: String,
    name: String,
    age: String,
    weigh: String,
    breed_id: String,
    owner_id: String,
    sex: String,
    breed_type: String,
    img: String,
  });

const Pet = mongoose.model("pet", petSchema, "pet");
export default Pet;

