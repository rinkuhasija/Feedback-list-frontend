import styles from './registerForm.module.css'
import email from '../../assets/email_img.png'
import lock from '../../assets/lock_img.png'
import mobile from '../../assets/mobile.png'
import user from '../../assets/user.png'
import { useState } from 'react'
import { useNavigate } from 'react-router'



function RegisterForm() {

    const navigate = useNavigate()
    const [data, setData] = useState({ name: "", mobile: "", email: "", password: "" })
    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!data.name || !data.mobile || !data.email || !data.password) {
            alert("Please fill in all fields.");
            return;
        }

        // Send the POST request
        try {
            const response = await fetch("https://feedback-list-imnos.ondigitalocean.app/api/auth/register", {
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
        }
    };


    return (
        <div className={styles.registerFormContainer}>

            <form >

                <div className={styles.input}>
                    <img src={user} alt="user_icon" />
                    <input name="name" value={data.name} onChange={handleChange} type="text" placeholder='Name' required />
                </div>

                <div className={styles.input}>
                    <img src={email} alt="message_img" />
                    <input name="email" value={data.email} onChange={handleChange} type="email" placeholder='Email' required />
                </div>

                <div className={styles.input}>
                    <img id={styles.mobile} src={mobile} alt="mobile_img" />
                    <input name="mobile" value={data.mobile} onChange={handleChange} type="number" placeholder='Mobile' required />
                </div>

                <div className={styles.input}>
                    <img src={lock} alt="lock_img" />
                    <input name="password" value={data.password} onChange={handleChange} type="password" placeholder='Password' required />
                </div>


            </form>

            <p className={styles.link}>Already have an account? <span onClick={() => navigate("/login")}>Log in</span></p>

            <button onClick={handleSubmit}> <span> Signup </span>  </button>

        </div>
    )
}

export default RegisterForm