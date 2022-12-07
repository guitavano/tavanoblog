
import styles from './newsletter.module.scss'

export default function Newsletter(){


    return(
        <>
            <section className={styles.NewsletterContainer}>
                <h1>Newsletter</h1>
                <p>Inscreva-se para receber os novos posts!</p>
                <div className={styles.Register}>
                    <input 
                        type="email" 
                        className={styles.Email}
                        placeholder="Seu e-mail"
                    />
                    <button>Registrar</button>
                </div>
                
            </section>
        </>
    )
}