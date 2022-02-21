import mongoose from "mongoose";

const productSchema = mongoose.Schema({
  madeBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  product_name: { type: String, min: 1, max: 200, required: true },
  product_description: { type: String, min: 1, max: 300, required: true },
  product_photo: { type: String, min: 1, required: true },
  product_type: { type: String, min: 1, required: true },
  price: { type: Number, min: 1, required: true },
  rates: [{ type: mongoose.Schema.Types.ObjectId, ref: "Rate" }],
  rates_count: { type: Number, default: 0 },
  likesFrom: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  likes: { type: Number, default: 0 },
  byAdmin: { type: Boolean, default: false },
  updated: { type: Date, default: Date.now },
});

export default mongoose.model("Product", productSchema);
