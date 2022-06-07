import styles from './footer.module.scss'
import {SiLinkedin, SiGithub} from 'react-icons/si'

export default function Footer(){

    return(
        <>
            <footer className={styles.footerContainer}>
                <div className={styles.footerContent}>
                    <div className={styles.social}>
                        <a href="https://www.linkedin.com/in/guitavano/" target="_blank" rel="noreferrer" className={styles.linkedin}>
                            <SiLinkedin/>
                        </a>
                        <a href="https://github.com/guitavano" target="_blank" rel="noreferrer" className={styles.github}>
                            <SiGithub />
                        </a>
                    </div>
                    <h2>Guilherme Tavano</h2>
                </div>
            </footer>
        </>
    )
}