import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

import ProductCard from "../productCard/ProductCard";
import classes from "./ItemsSlider.module.css";

function ItemsSlider({ items, type }) {
  const [width, setWidth] = useState(0);
  let containerRef = useRef(null);

  useEffect(() => {
    setWidth(
      containerRef.current.scrollWidth - containerRef.current.offsetWidth
    );
  }, []);

  return (
    <motion.div
      className={classes.slider__container}
      ref={containerRef}
      whileTap={{ cursor: "grabbing" }}
    >
      <motion.div
        className={classes.cards__container}
        drag="x"
        dragConstraints={{ right: 0, left: -width - 10 }}
      >
        {items.map((product) => (
          <ProductCard product={product} key={product._id} />
        ))}
      </motion.div>
    </motion.div>
  );
}

export default ItemsSlider;
