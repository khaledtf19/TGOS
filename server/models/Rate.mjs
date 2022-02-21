import mongoose from "mongoose";

const rateSchema = mongoose.Schema({
  madeBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    required: true,
  },
  rateContent: { type: String, min: 1, max: 255, required: true },
  rate: { type: Number, required: true, min: 0, max: 10 },
  updated: { type: Date, default: Date.now },
});

export default mongoose.model("Rate", rateSchema);
