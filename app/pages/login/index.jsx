import Head from "next/head";

import LoginPage from "../../components/loginPage/LoginPage";

const login = () => {
  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <LoginPage />
    </>
  );
};

export default login;
