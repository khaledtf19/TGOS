import { useState, createContext, useEffect } from "react";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [rerender, setRerender] = useState(false);

  useEffect(() => {
    const getUserData = () => {
      fetch(`http://localhost:8080/api/auth/me`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("auth-token"),
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.Error) {
            console.log(data.Error);
          } else {
            setUserData(data);
            console.log(data);
          }
        })
        .catch((err) => console.log(err));
    };
    getUserData();
  }, [rerender]);

  return (
    <AuthContext.Provider
      value={{ user: [userData, setUserData], render: [rerender, setRerender] }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
