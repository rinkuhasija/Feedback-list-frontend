import styles from './loginForm.module.css'
import email from '../../assets/email_img.png'
import lock from '../../assets/lock_img.png'
import { useState } from "react"
import { useNavigate } from "react-router-dom"

function LoginForm() {

    const navigate = useNavigate()
    const [data, setData] = useState({ email: "", password: "" })
    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (data.email && data.password) {
            try {
                const response = await fetch("https://feedback-list-imnos.ondigitalocean.app/api/auth/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                });

                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const responseData = await response.json();
                window.localStorage.setItem("token", responseData.token)
                navigate("/")

            } catch (error) {
                alert("There was a problem with the request, please try again");
                console.log(error)
            }
        } else {
            alert("Please fill in both fields.");
        }
    }
    return (
        <div className={styles.loginFormContainer}>

            <form >

                <div className={styles.input}>
                    <img src={email} alt="message_img" />
                    <input  name="email" value={data.email}  onChange={handleChange}  type="email" placeholder='Email' required />
                </div>

                <div className={styles.input}>
                    <img src={lock} alt="lock_img" />
                    <input  name="password" value={data.password}  onChange={handleChange}  type="password" placeholder='Password' required />
                </div>

            </form>

            <p className={styles.link}>Don&apos;t have an account? <span  onClick={()=>navigate("/register")}>Sign up</span></p>

            <button onClick={handleSubmit}> <span> Log in </span>  </button>

        </div>
    )
}

export default LoginForm