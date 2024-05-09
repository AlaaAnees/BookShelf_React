import { GoogleLogin } from "@react-oauth/google";

import { useState } from "react";
import { useApp } from "../Contexts/appContext";
import styles from "../Styles/LoginForm.module.css";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
const LoginForm = () => {
  const { login } = useApp();
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    email: "",
    password: "",
    gmail: false,
  });

  const [emailError, setEmailError] = useState("");

  const handleLoginClick = async (event) => {
    if (event) {
      event.preventDefault();
    }

    let res = await login(userData);

    if (res.data.message) {
      const decodedToken = jwtDecode(res.data.token);
      if (decodedToken.isAdmin == "admin") {
        navigate("/admin");
      } else {
        navigate("/home");
      }
    } else {
      setEmailError("Invalid Email or Password");
    }
  };

  const handleOnChange = (event) => {
    setUserData((oldUser) => ({
      ...oldUser,
      [event.target.name]: event.target.value,
    }));
  };
  function handleBookOnClick(event) {
    event.preventDefault();
    navigate("/");
  }
  return (
    <>
      <div className={styles.imgContainer}></div>

      <form
        autoComplete="off"
        className={styles.loginForm}
        onSubmit={handleLoginClick}
      >
        <button
          type="button"
          style={{ all: "unset" }}
          onClick={handleBookOnClick}
          title="home"
        >
          <div className={styles.headLine}>
            <span>Book</span>
            <span style={{ color: "#8d27ae" }}>Shelf</span>
          </div>
        </button>
        <div className={styles.inputContainer}>
          <label htmlFor="email" className={styles.labels}>
            E-mail:
          </label>
          <input
            required
            className={styles.inputs}
            type="email"
            id="email"
            name="email"
            placeholder="Your Email address"
            onChange={handleOnChange}
          />
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="password" className={styles.labels}>
            Password:
          </label>
          <input
            className={styles.inputs}
            type="password"
            id="password"
            name="password"
            placeholder="Your password"
            onChange={handleOnChange}
          />
        </div>
        {emailError && <div className={styles.error}>{emailError}</div>}
        <button className={styles.btnLogin}>Login</button>
        <GoogleLogin
          onSuccess={async (credentialResponse) => {
            let mail = await jwtDecode(credentialResponse.credential).email;
            setUserData((oldUser) => ({
              ...oldUser,
              gmail: true,
              email: mail,
            }));
            handleLoginClick();
          }}
          onError={() => {
            console.log("Login Failed");
          }}
        />
        ;
      </form>
    </>
  );
};

export default LoginForm;
