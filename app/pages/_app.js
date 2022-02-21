import "../styles/globals.css";
import { Layout } from "../components/layout/Layout";
import { AuthContextProvider } from "../context/Auth/AuthContext";

function MyApp({ Component, pageProps, router }) {
  return (
    <AuthContextProvider>
      <Layout router={router}>
        <Component {...pageProps} />
      </Layout>
    </AuthContextProvider>
  );
}

export default MyApp;
