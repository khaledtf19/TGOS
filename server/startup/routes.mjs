import express from "express";
import authRouter from "../auth/auth.mjs";
import productsRouter from "../routes/product.mjs";
import retsRouter from "../routes/rate.mjs";

export default function routes(app) {
  app.use(express.json());
  app.use("/api/auth", authRouter);
  app.use("/api/products", productsRouter);
  app.use("/api/rates", retsRouter);
}
