import { useState, useEffect, useContext } from "react";

import ProductsGrid from "../productsGrid/ProductsGrid";
import AuthContext from "../../context/Auth/AuthContext";

function ProfilePage() {
  const [products, setProducts] = useState([]);

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
          // console.log(data.data);
        }
      });
  };

  useEffect(() => {
    getUserProducts();
  }, [userData]);

  return <>{products && <ProductsGrid products={products} />}</>;
}

export default ProfilePage;
