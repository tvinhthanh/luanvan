import mongoose from "mongoose";

const breedTypeSchema = new mongoose.Schema({
    _id: String,
    name: String,
    array: Array,
  });

const breedType = mongoose.model("breedType", breedTypeSchema, "breedType");
export default breedType;
