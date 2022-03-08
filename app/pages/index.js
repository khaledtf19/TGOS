import Head from "next/head";
import Image from "next/image";
import HomePage from "../components/homePage/HomePage";

export default function Home({ products }) {
  if (products.Error) {
    console.log(products.Error);
  }
  return (
    <>
      <HomePage products={products?.data} />
    </>
  );
}

export async function getServerSideProps(context) {
  const res = await fetch(`http://localhost:8080/api/products`);
  const products = await res.json();

  return {
    props: {
      products,
    },
  };
}
