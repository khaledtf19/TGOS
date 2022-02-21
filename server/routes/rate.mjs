import express from "express";
const router = express.Router();

import User from "../models/User.mjs";
import Rate from "../models/Rate.mjs";
import Product from "../models/Product.mjs";
import verify from "../middleware/verify.js";
import { rateValidation } from "../validation/rateV.mjs";

router.post("/create", verify, async (req, res) => {
  const { error } = rateValidation(req.body);
  if (error) return res.status(400).json({ Error: error.details[0].message });

  const { rateContent, rate, productId } = req.body;

  const newRate = new Rate({
    madeBy: req.user._id,
    product: productId,
    rate: rate,
    rateContent: rateContent,
  });

  const product = await Product.findById(productId);
  if (!product) {
    res.status(404).json({ Error: "Product not found" });
  }

  product.rates = [...product.rates, newRate._id];
  product.rates_count++;
  await product.save();
  const savedRate = await newRate.save();
  res.json({ data: savedRate });
});

router.delete("/delete", verify, async (req, res) => {
  const { rateId, productId } = req.body;

  const rate = await Rate.findById(rateId);
  if (!rate) {
    res.status(404).json({ Error: "Rate not found" });
  }
  if (rate.madeBy != req.user._id) {
    res.status(401).json({ Error: "You can't delete this..." });
  }

  const product = await Product.findById(productId);
  if (!product) {
    res.status(404).json({ Error: "Product not found" });
  }

  let index = product.rates.indexOf(rate._id);
  product.rates.splice(index, 1);

  await Rate.findByIdAndDelete(rate._id);
  await product.save();
  res.json({ message: `Rate deleted ${rate._id}` });
});

// Get all rates for 1 product by product id

router.post("/product", async (req, res) => {
  const productId = req.query.pid;

  const rates = await Rate.find({ product: productId });
  if (!rates) {
    res.status(404).json({ Error: "rates not found" });
  }
  res.json({ data: rates });
});

export default router;
