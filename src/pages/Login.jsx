import styles from "./Login.module.css";
import { useEffect, useState } from "react";
import PageNav from "../components/PageNav";
import Button from "../components/Button";
import { useAuth } from "../contexts/FakeLoginContext";
import { useNavigate } from "react-router-dom";
export default function Login() {
  // PRE-FILL FOR DEV PURPOSES
  const navigate = useNavigate();
  const [email, setEmail] = useState("jack@example.com");
  const [password, setPassword] = useState("qwerty");
  const { authentication, Login } = useAuth();
  function handleSubmit(e) {
    e.preventDefault();
    // console.log(e);
    if (!email && !password) return;
    Login(email, password);
  }
  useEffect(
    function () {
      if (authentication) navigate("/app", { replace: true });
    },
    [authentication, navigate]
  );
  return (
    <main className={styles.login}>
      <PageNav />
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <Button type="primary">ADD</Button>
        </div>
      </form>
    </main>
  );
}
