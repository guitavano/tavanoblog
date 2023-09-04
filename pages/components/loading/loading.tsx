import styles from './loading.module.scss'


export default function Loading(){

    return(
        <div className={styles.loadingContainer}>
            <span className={styles.loading}></span>
        </div>
    )
    
    
}