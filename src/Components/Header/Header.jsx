import styles from './header.module.css'
import header_img from '../../assets/main_page_header_img.png'

function Header() {
    return (
        <div className={styles.headerContainer}>
            <img src={header_img} alt="header-image" />

            <div className={styles.headerContent}>
                <h1>Add your products and give
                    your valuable feedback</h1>
                <p>Easily give your feedback in a matter of minutes. Access your audience on all platforms. Observe result manually in real time</p>
            </div>
        </div>
    )
}

export default Header