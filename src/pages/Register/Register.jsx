import RegisterForm from '../../Components/RegisterForm/RegisterForm'
import styles from './register.module.css'

function Register() {
    return (
        <div className={styles.registerContainer}>
            <h1>Feedback</h1>
            <p>Add your products and give us your valuable feedback</p>
            <div className={styles.registerForm}>
                <RegisterForm />
            </div>
        </div>
    )
}

export default Register