import styles from './login.module.css'
import LoginForm from '../../Components/LoginForm/LoginForm'

function Login() {
    return (
        <div className={styles.loginContainer}>
            <h1>Feedback</h1>
            <p>Add your products and give us your valuable feedback</p>
            <div className={styles.loginForm}>
                <LoginForm />
            </div>

        </div>
    )
}

export default Login