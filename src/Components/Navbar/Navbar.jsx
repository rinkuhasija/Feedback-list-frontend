import { useState } from 'react'
import styles from './navbar.module.css'
import { useNavigate } from 'react-router'
import profile_img from '../../assets/profile_img.png'

function Navbar(props) {

    const navigate = useNavigate();
    const login = props.login;

    const sendDataToParent = () => {
        const data = true;
        props.sendData(data);
      };

    return (
        <div className={styles.navbarContainer}>

            <div className={styles.textNav}>
                <p> Feedback </p>
            </div>

            {login ? <div className={styles.logoutSuccess}>
            <button className={styles.logoutBtn} onClick={sendDataToParent}><span> Log out </span> </button>
            <p> Hello! </p>
            <img src={profile_img} alt="profile_img" />
            </div> : <div className={styles.logout}>
                <button className={styles.login} onClick={()=> navigate("/login")}><span> Log in </span> </button>
                <button className={styles.signup}><span onClick={()=>navigate("/register")}>  Sign up </span></button>
            </div>}
        </div>
    )
}

export default Navbar