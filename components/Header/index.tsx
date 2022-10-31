import Link from 'next/link'
import styles from './header.module.scss'

export default function Header() {
    return (
        <>
            <header className={styles.headerContainer}>
                <div className={styles.headerContent}>
                    <Link href="/">
                        <h1>TavanoBlog</h1>
                    </Link>
                </div>
            </header>
        </>
    )
}
