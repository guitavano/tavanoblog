import Link from 'next/link'
import { useEffect, useState } from 'react'
import styles from './header.module.scss'

import { useRouter } from 'next/router'

export default function Header() {

    const [search, setSearch] = useState("")

    function handleKeyDown (e) {
        if (e.key === 'Enter' && search.length > 0) {
          router.push("/busca/" + search)
        }
    }

    function handleSearch(){
        if(search.length > 0){
            router.push("/busca/" + search)
        }
    }

    const router = useRouter()
    return (
        <>
            <header className={styles.headerContainer}>
                <div className={styles.headerContent}>
                    <Link href="/">
                        <h1>TavanoBlog</h1>
                    </Link>
                    <div className={styles.inputContainer}>
                        <input 
                        type="text" 
                        className={styles.searchInput}
                        value={search} 
                        onChange={e => setSearch(e.target.value)}
                        onKeyDown={e => handleKeyDown(e)}
                        />
                        <span
                        onClick={() => handleSearch()}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
                                <path d="M17.1527 15.0943H16.0686L15.6844 14.7238C17.0292 13.1595 17.8388 11.1286 17.8388 8.91938C17.8388 3.99314 13.8456 0 8.91938 0C3.99314 0 0 3.99314 0 8.91938C0 13.8456 3.99314 17.8388 8.91938 17.8388C11.1286 17.8388 13.1595 17.0292 14.7238 15.6844L15.0943 16.0686V17.1527L21.9554 24L24 21.9554L17.1527 15.0943ZM8.91938 15.0943C5.50257 15.0943 2.74443 12.3362 2.74443 8.91938C2.74443 5.50257 5.50257 2.74443 8.91938 2.74443C12.3362 2.74443 15.0943 5.50257 15.0943 8.91938C15.0943 12.3362 12.3362 15.0943 8.91938 15.0943Z" fill="#1A1D23"/>
                            </svg>
                        </span>
                    </div>
                </div>
            </header>
        </>
    )
}
