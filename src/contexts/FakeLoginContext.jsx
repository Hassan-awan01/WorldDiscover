import { createContext, useContext, useReducer } from "react";

const LoginContext = createContext();

const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return { ...state, user: action.payload, authentication: true };
    case "logout":
      return { ...state, user: null, authentication: false };
    default:
      throw new Error("Unknown action");
  }
}
/* eslint-disable react/prop-types */
function LoginContextProvider({ children }) {
  const [{ user, authentication }, dispatch] = useReducer(reducer, {
    user: null,
    authentication: false,
  });

  function Login(email, password) {
    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      dispatch({ type: "login", payload: FAKE_USER });
    }
  }

  function Logout() {
    dispatch({ type: "logout" });
  }

  return (
    <LoginContext.Provider value={{ Login, Logout, user, authentication }}>
      {children}
    </LoginContext.Provider>
  );
}

function useAuth() {
  const context = useContext(LoginContext);
  if (!context) {
    throw new Error("useAuth must be used within a LoginContextProvider");
  }
  return context;
}

export { useAuth, LoginContextProvider };
