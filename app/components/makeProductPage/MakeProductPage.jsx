import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Select from "react-select";

import classes from "./MakeProductPage.module.css";
import utils from "../../styles/utils.module.css";

const productSchema = yup.object().shape({
  product_name: yup.string().min(6).required(),
  product_description: yup.string().min(6).required(),
  product_photo: yup.string().min(6).required().url(),
  price: yup.number().required(),
});

function MakeProductPage() {
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState("");

  const createProduct = (data) => {
    data.product_type = selected.value;

    console.log(data, selected);
    setLoading(true);
    fetch(`http://localhost:8080/api/products/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("auth-token"),
      },
      body: JSON.stringify(data),
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        setLoading(false);
      });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(productSchema),
  });

  const options = [
    { value: "unknown", label: "Unknown" },
    { value: "electronics", label: "Electronics" },
    { value: "men's fashion", label: "Men's fashion" },
    { value: "women's fashion", label: "Women's fashion" },
    { value: "food", label: "Food" },
  ];

  function customTheme(theme) {
    return {
      ...theme,
      colors: {
        ...theme.colors,
        primary25: "rgb(36, 37, 38)",
        primary: "#b0925a",
      },
    };
  }

  return (
    <form
      onSubmit={handleSubmit(createProduct)}
      className={utils.form__container}
    >
      <h2 className={utils.big__header}>Sell You Product</h2>
      <div className={utils.form__input__container}>
        <input
          type="text"
          name="product_name"
          placeholder="product Name..."
          {...register("product_name")}
          className={`${utils.form__input} ${
            errors.product_name ? utils.input__error : ""
          }`}
        />
        <p className={utils.input__error__text}>
          {errors.product_name?.message}
        </p>
      </div>
      <div className={utils.form__input__container}>
        <input
          type="text"
          name="product_photo"
          placeholder="product Photo..."
          {...register("product_photo")}
          className={`${utils.form__input} ${
            errors.product_photo ? utils.input__error : ""
          }`}
        />
        <p className={utils.input__error__text}>
          {errors.product_photo?.message}
        </p>
      </div>
      <div className={utils.form__input__container}>
        <input
          type="text"
          name="price"
          placeholder="price..."
          {...register("price")}
          className={`${utils.form__input} ${
            errors.price ? utils.input__error : ""
          }`}
        />
        <p className={utils.input__error__text}>{errors.price?.message}</p>
      </div>
      <div className={utils.form__input__container}>
        <Select
          options={options}
          defaultValue={options[0]}
          className={classes.filter}
          theme={customTheme}
          onChange={setSelected}
        />
      </div>
      <div className={utils.form__input__container}>
        <textarea
          type="text"
          name="product_description"
          placeholder="product Description..."
          {...register("product_description")}
          className={`${utils.form__textarea} ${
            errors.product_description ? utils.input__error : ""
          }`}
        />
        <p className={utils.input__error__text}>
          {errors.product_description?.message}
        </p>
      </div>
      <button type="submit" className={utils.primary__btn}>
        {loading ? `Wait...` : `Submit`}
      </button>
    </form>
  );
}

export default MakeProductPage;
