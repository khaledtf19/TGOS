import { useState } from "react";
import classes from "./MakeProduct.module.css";
import ProductPopup from "../productPopup/ProductPopup";

const MakeProduct = () => {
  const [openMP, setOpenMP] = useState(false);

  return (
    <>
      <div
        className={classes.makeProduct__container}
        onClick={() => setOpenMP(!openMP)}
      >
        <h1>make</h1>
      </div>
      {openMP && <ProductPopup setOpenMP={setOpenMP} />}
    </>
  );
};

export default MakeProduct;
