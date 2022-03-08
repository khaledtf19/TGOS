import { motion, AnimatePresence } from "framer-motion";

import classes from "./ProductsGrid.module.css";
import ProductCard from "../productCard/ProductCard";

function ProductsGrid({ products }) {
  console.log(products);
  return (
    <motion.div layout className={classes.grid__container}>
      <AnimatePresence>
        {products.map((product) => {
          return <ProductCard product={product} key={product._id} />;
        })}
      </AnimatePresence>
    </motion.div>
  );
}

export default ProductsGrid;
