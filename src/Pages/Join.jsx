
import LoginForm from "../Components/loginForm";
import styles from "../Styles/join.module.css";
import RegisterForm from "../Components/registerForm";
import { useApp } from "../Contexts/appContext";
const Join = () => {
  const {loginActive,setLoginActive} = useApp();
  

 function handleOnclick(event){
    setLoginActive(event.target.value=="true")
   

  }

  return (
    <div className={styles.container}>
      <div className={styles.overLay}></div>
      <div className={styles.mainContainer}>
      <div className={styles.btnsContainer}>
      <button className={ loginActive?styles.btnsActive:styles.btns} onClick={handleOnclick} value={true} >Sign In</button>
      <button className={ loginActive?styles.btns:styles.btnsActive} onClick={handleOnclick} value={false}>Sign Up</button>
      </div>
      
      {loginActive ? <LoginForm></LoginForm>:<RegisterForm></RegisterForm>}


      </div>
    </div>
  );
};

export default Join;
