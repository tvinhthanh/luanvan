import mongoose from "mongoose";

const ownerSchema = new mongoose.Schema({
    _id: String,
    name: String,
    email: String,
    pass: String,
    phone: String,
    role: Number,
    img: String,
  });

const Owner = mongoose.model("owner", ownerSchema, "owner");
export default Owner;
