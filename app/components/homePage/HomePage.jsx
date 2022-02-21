import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

import ProductCard from "../productCard/ProductCard";
import ItemsSlider from "../itemsSlider/ItemsSlider";

import classes from "./HomePage.module.css";

const HomePage = ({ products }) => {
  return (
    <motion.div className={classes.homePage__container}>
      <div className={classes.mp__button}>
        <Link href={"/makeProduct"}>
          <a className={classes.link}>sell your product</a>
        </Link>
      </div>
      <ItemsSlider items={products} type={"New Products"} />
    </motion.div>
  );
};

export default HomePage;
