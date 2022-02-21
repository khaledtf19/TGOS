import classes from "./ProductsGrid.module.css";
import ProductCard from "../productCard/ProductCard";

function ProductsGrid({ products }) {
  console.log(products);
  return (
    <div className={classes.grid__container}>
      {products.map((product) => {
        return <ProductCard product={product} />;
      })}
    </div>
  );
}

export default ProductsGrid;
