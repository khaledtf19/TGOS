import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import utils from "../../styles/utils.module.css";

const registerSchema = yup.object().shape({
  name: yup.string().min(3).required(),
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
  confirmPassword: yup.string().oneOf([yup.ref("password"), null]),
});

const RegisterPage = () => {
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [errorText, setErrorText] = useState("");

  const registerFunc = async (data) => {
    console.log(data);
    setLoading(true);
    const { name, password, email } = data;

    fetch(`http://localhost:8080/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, password, email }),
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        if (data.Error) {
          setErrorText(data.Error);
          setModalOpen(true);
        }
        setLoading(false);
      })
      .catch((error) => console.log(error));
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  return (
    <form
      onSubmit={handleSubmit(registerFunc)}
      className={utils.form__container}
    >
      <h2 className={utils.big__header}>Register</h2>
      <div className={utils.form__input__container}>
        <input
          type="text"
          name="name"
          placeholder="Name..."
          {...register("name")}
          className={`${utils.form__input} ${
            errors.name ? utils.input__error : ""
          }`}
        />
        <p className={utils.input__error__text}>{errors.name?.message}</p>
      </div>
      <div className={utils.form__input__container}>
        <input
          type="text"
          name="email"
          placeholder="Email..."
          {...register("email")}
          className={`${utils.form__input} ${
            errors.email ? utils.input__error : ""
          }`}
        />
        <p className={utils.input__error__text}>{errors.email?.message}</p>
      </div>

      <div className={utils.form__input__container}>
        <input
          type="password"
          name="password"
          placeholder="Password..."
          {...register("password")}
          className={`${utils.form__input} ${
            errors.password ? utils.input__error : ""
          }`}
        />
        <p className={utils.input__error__text}>{errors.password?.message}</p>
      </div>
      <div className={utils.form__input__container}>
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password..."
          {...register("confirmPassword")}
          className={`${utils.form__input} ${
            errors.confirmPassword ? utils.input__error : ""
          }`}
        />
        <p className={utils.input__error__text}>
          {errors.confirmPassword?.message}
        </p>
      </div>

      <button type="submit" className={utils.primary__btn}>
        {loading ? `loading...` : `Register`}
      </button>
    </form>
  );
};

export default RegisterPage;
