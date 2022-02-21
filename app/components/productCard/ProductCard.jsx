import classes from "./ProductCard.module.css";

const ProductCard = ({ product }) => {
  return (
    <div className={classes.card__container}>
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
    </div>
  );
};

export default ProductCard;
