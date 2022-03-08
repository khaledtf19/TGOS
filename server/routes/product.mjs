import express from "express";
import { ObjectId } from "mongodb";
const router = express.Router();

import User from "../models/User.mjs";
import Product from "../models/Product.mjs";
import Rate from "../models/Rate.mjs";
import verify from "../middleware/verify.js";

import { productValidation } from "../validation/productV.mjs";

// Get All
router.get("/", async (req, res) => {
  const filter = req.query.filter;
  let products = null;

  if (!filter) {
    products = await Product.find().sort("-updated");
  } else {
    products = await Product.find({
      product_type: filter,
    }).sort("-updated");
  }

  res.json({ data: products });
});

// Create
router.post("/create", verify, async (req, res) => {
  const { error } = productValidation(req.body);
  if (error) return res.status(400).json({ Error: error.details[0].message });

  const product_types = [
    "electronics",
    "food",
    "men's fashion",
    "women's fashion",
    "unknown",
  ];

  let {
    product_name,
    product_description,
    product_photo,
    price,
    product_type,
  } = req.body;

  if (product_types.indexOf(product_type) < 0) {
    product_type = "unknown";
  }

  const product = new Product({
    product_name: product_name,
    product_description: product_description,
    product_photo: product_photo,
    price: price,
    madeBy: req.user._id,
    byAdmin: req.user.admin,
    product_type: product_type,
  });

  const userId = req.user._id;
  const user = await User.findById(userId);
  user.own_products = [...user.own_products, product._id];

  await product.save();
  await user.save();
  res.json({ message: "product saved" });
});

// Get By Id
router.get("/product", async (req, res) => {
  const id = req.query.id;
  if (!ObjectId.isValid(id)) {
    return res.status(404).json({ Error: "Product id is not valid" });
  }

  const product = await Product.findById(id)
    .populate("madeBy", "name")
    .populate({
      path: "rates",
      populate: { path: "madeBy", select: "name" },
    });
  if (!product) {
    return res.status(404).json({ Error: "Product not found" });
  }
  res.json({ data: product });
});

// Delete By Id
router.delete("/delete", verify, async (req, res) => {
  const id = req.query.id;

  if (!ObjectId.isValid(id)) {
    return res.status(404).json({ Error: "Product id is not valid" });
  }

  const product = await Product.findById(id);
  if (!product) {
    return res.status(404).json({ Error: "Product not found" });
  }

  if (product.madeBy != req.user._id) {
    return res.status(401).json({ Error: "You can't delete this product" });
  }

  const user = await User.findById(req.user._id);
  let index = user.own_products.indexOf(product._id);
  user.own_products.splice(index, 1);

  const rates = await Rate.find({ product: product._id }).deleteMany();

  await Product.findByIdAndDelete(id);
  await user.save();
  res.json({ message: `product deleted ${id}` });
});

// Like Products
router.post("/like", verify, async (req, res) => {
  const id = req.query.id;

  if (!ObjectId.isValid(id)) {
    return res.status(404).json({ Error: "Product id is not valid" });
  }

  const product = await Product.findById(id);
  if (!product) {
    return res.status(404).json({ Error: "Product not found" });
  }

  if (product.likesFrom.includes(req.user._id)) {
    let index = product.likesFrom.indexOf(req.user._id);
    product.likesFrom.splice(index, 1);
    product.likes--;
  } else {
    product.likesFrom.push(req.user._id);
    product.likes++;
  }

  await product.save();

  res.json({ data: product });
});

// Find the products for a user
router.post("/user", async (req, res) => {
  const id = req.query.id;

  if (!ObjectId.isValid(id)) {
    return res.status(404).json({ Error: "user id is not valid" });
  }

  if (!id) {
    return res.status(404).json({ Error: "Need user id" });
  }
  const user = await User.findById(id);
  if (!user) {
    return res.status(404).json({ Error: "Invalid user id" });
  }

  const filter = req.query.filter;
  let products = null;

  if (!filter) {
    products = await Product.find({ madeBy: id }).sort("-updated");
  } else {
    products = await Product.find({
      madeBy: id,
      product_type: filter,
    }).sort("-updated");
  }

  res.json({ data: products });
});

export default router;
