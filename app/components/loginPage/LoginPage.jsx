import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import AuthContext from "../../context/Auth/AuthContext";
import Modal from "../Modal/Modal";

import utils from "../../styles/utils.module.css";

const loginSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
});

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [errorText, setErrorText] = useState("");

  const [navMenu, setNavMenu] = useState(false);
  const { user, render } = useContext(AuthContext);
  const [userData, setUserData] = user;
  const [rerender, setRerender] = render;

  const login = async (data) => {
    console.log(data);
    setLoading(true);

    fetch(`http://localhost:8080/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        if (data.Error) {
          setErrorText(data.Error);
          setModalOpen(true);
        } else {
          localStorage.setItem("auth-token", data);
          setRerender(!rerender);
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
    resolver: yupResolver(loginSchema),
  });

  return (
    <form onSubmit={handleSubmit(login)} className={utils.form__container}>
      <h2 className={utils.big__header}>Login</h2>
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

      <button type="submit" className={utils.primary__btn}>
        {loading ? `loading...` : `Login`}
      </button>
      {modalOpen && (
        <Modal
          modalOpen={modalOpen}
          handleClose={() => setModalOpen(false)}
          text={errorText}
        />
      )}
    </form>
  );
};
export default LoginPage;
