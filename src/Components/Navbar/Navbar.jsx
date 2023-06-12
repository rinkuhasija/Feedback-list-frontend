import { useState, useContext } from 'react'
import styles from './navbar.module.css'
import { useNavigate } from 'react-router'
import profile_img from '../../assets/profile_img.png'
import AuthContext from '../../context/AuthContext.jsx'

function Navbar() {

    const navigate = useNavigate();
    const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

    function handleLogout() {
        setIsLoggedIn(false)
        window.localStorage.removeItem("token");
        window.localStorage.removeItem("isLoggedIn");
        navigate("/login")
    }

    return (
        <div className={styles.navbarContainer}>

            <div className={styles.textNav}>
                <p> Feedback </p>
            </div>

            {isLoggedIn ? <div className={styles.logoutSuccess}>
            <button className={styles.logoutBtn} onClick={handleLogout}><span> Log out </span> </button>
            <img src={profile_img} alt="profile_img" />
            </div> : <div className={styles.logout}>
                <button className={styles.login} onClick={()=>navigate("/login")}><span> Log in </span> </button>
                <button className={styles.signup} onClick={()=>navigate("/register")}><span>  Sign up </span></button>
            </div>}
        </div>
    )
}

export default Navbar