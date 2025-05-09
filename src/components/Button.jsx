/* eslint-disable react/prop-types */
import styles from "./Button.module.css";
const Button = ({ children, onClick, type }) => {
  return (
    <button className={styles[type]} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
