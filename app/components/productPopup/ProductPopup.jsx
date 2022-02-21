import { RiCloseLine } from "react-icons/ri";
import classes from "./ProductPopup.module.css";

const ProductPopup = ({ setOpenMP }) => {
  return (
    <div className={classes.bigScreen}>
      <div
        className={classes.popup__screen}
        onClick={() => setOpenMP(false)}
      ></div>
      <div className={classes.popup__container}>
        <div className={classes.closeIcon}>
          <RiCloseLine size={30} onClick={() => setOpenMP(false)} />
        </div>
        <div className={classes.popup__content}>
          <h1>popup</h1>
        </div>
      </div>
    </div>
  );
};

export default ProductPopup;
