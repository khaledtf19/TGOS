import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  email: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  password: {
    type: String,
    required: true,
    max: 2000,
    min: 6,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  own_products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Project" }],
  saved_products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Project" }],
  admin: { type: Boolean, default: false },
});
export default mongoose.model("User", userSchema);
