import mongoose from "mongoose";

const scheduleSchema = new mongoose.Schema({
    _id: String,
    owner_id: String,
    vet_id: String,
    pet_id: String,
    note: String,
    datetime: Date,
    status: String,
  });
const Schedule = mongoose.model("schedule", scheduleSchema, "schedule");
export default Schedule;
