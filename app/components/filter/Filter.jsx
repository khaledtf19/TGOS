import { useState } from "react";

import classes from "./Filter.module.css";
import Select from "react-select";
import { useEffect } from "react";

function Filter({ setFilter, filter, setFProducts, products }) {
  const [selected, setSelected] = useState("");

  const options = [
    { value: "", label: "All" },
    { value: "electronics", label: "Electronics" },
    { value: "men's fashion", label: "Men's fashion" },
    { value: "women's fashion", label: "Women's fashion" },
    { value: "food", label: "Food" },
    { value: "unknown", label: "Unknown" },
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

  useEffect(() => {
    if (selected?.value) {
      setFilter(selected.value);
      const filtered = products.filter(
        (product) => product.product_type == selected.value
      );
      setFProducts(filtered);
    } else {
      setFProducts(products);
    }
  }, [selected]);

  return (
    <div className={classes.filter__container}>
      <div className={classes.search__part}>search</div>
      <div className={classes.filter__part}>
        <Select
          options={options}
          defaultValue={options[0]}
          className={classes.filter}
          theme={customTheme}
          onChange={setSelected}
        />
      </div>
    </div>
  );
}

export default Filter;
