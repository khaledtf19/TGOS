import Image from "next/image";

import classes from "./ProductPage.module.css";

function ProductPage({ product }) {
  return (
    <div className={classes.product__container}>
      <div className={classes.product__info}>
        <div className={classes.User}>
          <h3>by: {product.madeBy.name}</h3>
        </div>
        <div className={classes.productName}>
          <h3>{product.product_name}</h3>
        </div>
      </div>
      <div className={classes.product__photo}>
        <Image
          width={500}
          height={500}
          alt={product.product_name}
          src={product.product_photo}
          className={classes.image}
          objectFit="scale-down"
        />
      </div>
      <div className={classes.product__description}>
        <p>{product.product_description}</p>
      </div>
    </div>
  );
}

export default ProductPage;
