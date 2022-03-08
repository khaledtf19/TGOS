import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

import classes from "./ProductCard.module.css";

const ProductCard = ({ product }) => {
  const cardVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: { duration: 0.5 },
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
        <Image
          width={150}
          height={100}
          alt={product.product_name}
          src={product.product_photo}
          className={classes.image}
        />
      </div>
      <Link href={`/product/${product._id}`}>
        <a className={classes.link}>
          <div className={classes.card__name}>
            <h3 className={classes.productName}>
              {product.product_name.length > 30
                ? product.product_name.slice(0, 30) + `...`
                : product.product_name}
            </h3>
          </div>
        </a>
      </Link>
      <div className={classes.card__price}>
        <p className={classes.productPrice}>{product.price}$</p>
      </div>
    </motion.div>
  );
};

export default ProductCard;
