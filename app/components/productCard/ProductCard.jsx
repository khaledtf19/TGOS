import { motion } from "framer-motion";

import classes from "./ProductCard.module.css";

const ProductCard = ({ product }) => {
  const cardVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: { duration: 0.6 },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <motion.div
      layout
      className={classes.card__container}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className={classes.image__container}>
        <img
          alt={product.product_name}
          src={product.product_photo}
          className={classes.image}
        />
      </div>
      <h3 className={classes.productName}>
        {product.product_name.length > 20
          ? product.product_name.slice(0, 20) + `...`
          : product.product_name}
      </h3>
      <p className={classes.productPrice}>{product.price}$</p>
    </motion.div>
  );
};

export default ProductCard;
