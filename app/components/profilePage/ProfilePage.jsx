import { useState, useEffect, useContext } from "react";

import ProductsGrid from "../productsGrid/ProductsGrid";
import Filter from "../filter/Filter";
import AuthContext from "../../context/Auth/AuthContext";

import classes from "./ProfilePage.module.css";

function ProfilePage() {
  const [products, setProducts] = useState([]);
  const [fProducts, setFProducts] = useState([]);
  const [filter, setFilter] = useState("");

  const { user, render } = useContext(AuthContext);
  const [userData, setUserData] = user;
  const [rerender, setRerender] = render;

  const getUserProducts = async () => {
    fetch(`http://localhost:8080/api/products/user?id=${userData?._id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (data.Error) {
          console.log(data.Error);
        } else if (data.data) {
          setProducts(data.data);
          setFProducts(data.data);
          // console.log(data.data);
        }
      });
  };

  useEffect(() => {
    getUserProducts();
  }, [userData]);

  return (
    <div className={classes.profilePage__container}>
      <Filter
        setFilter={setFilter}
        filter={filter}
        setFProducts={setFProducts}
        products={products}
      />
      {products && <ProductsGrid products={fProducts} />}
    </div>
  );
}

export default ProfilePage;
