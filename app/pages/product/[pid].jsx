import ProductPage from "../../components/productPage/ProductPage";

function Product(data) {
  console.log(data);

  return (
    <>
      {data.data.data ? (
        <ProductPage product={data.data.data} />
      ) : (
        console.log(data.data)
      )}
    </>
  );
}

export async function getServerSideProps(context) {
  // console.log(context.params);

  const res = await fetch(
    `http://localhost:8080/api/products/product?id=${context.params.pid}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const data = await res.json();

  return {
    props: {
      data,
    },
  };
}

export default Product;
