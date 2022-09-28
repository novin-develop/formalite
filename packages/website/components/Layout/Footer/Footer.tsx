import styles from "../../../styles/Home.module.css";

const Footer = () => {
    return (
        <footer style={{marginTop:"32px"}} >
            <a className={styles.footer}
                href="https://novin.dev/"
                target="_blank"
                rel="noopener noreferrer"
            >
                Powered by{' '}
              <img src="/novin_mini_logo.svg" alt="Vercel Logo" width={110} height={80} />
            </a>
        </footer>
    )
}
export default Footer;
