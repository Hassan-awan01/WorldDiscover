import { createContext, useContext, useReducer } from "react";

const LoginContext = createContext();

function reducer(state, action) {}
function LoginContextProvider() {
  const [state, dispatch] =
    useReducer[(reducer, { login: null, authentication: false })];
  function Login() {}
  <LoginContext.Provider></LoginContext.Provider>;
}
function useAuth() {
  const contexts = useContext(LoginContext);
  if (contexts === undefined)
    throw new Error("context is used outside of its provider");
  return contexts;
}
