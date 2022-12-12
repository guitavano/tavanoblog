
import styles from './newsletter.module.scss'

import { use, useState } from 'react';

export default function Newsletter(){

    const [email, setEmail] = useState("")

    const [isSending, setIsSending] = useState(false)
    const [sent, setSent] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")

    let options = {
        'method': 'POST'
    }

    function registerNewsletter(e){
        e.preventDefault()
        console.log(email)

        setIsSending(true)

        fetch('/api/newsletter/' + email, options)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            let message = data.message
            if(message == "Registrado com sucesso!"){
                setIsSending(false)
                setSent(true)
                setEmail("")
            }
            if(message == "Seu e-mail já está registrado!"){
                setIsSending(false)
                setSent(false)
                setEmail("")
                setErrorMessage("Este e-mail já foi registrado")
            }
            if(message == "E-mail inválido"){
                setIsSending(false)
                setSent(false)
                setEmail("")
                setErrorMessage("Digite um e-mail válido")
            }
        })
    }

    return(
        <>
            <section className={styles.NewsletterContainer}>
                <h1>Newsletter</h1>
                <p className={styles.SubTitle}>Inscreva-se para receber os novos posts!</p>
                <form className={styles.Register}>
                        <input 
                            type="email" 
                            className={styles.Email}
                            placeholder="Seu e-mail"
                            value={email}
                            onInput={(e) => {
                                setSent(false)
                                setErrorMessage("")
                                setEmail(e.target.value)
                            }}
                            required
                        />
                        <button type='submit' onClick={(e) => registerNewsletter(e)}>
                        {
                            isSending == true ? <span className={styles.Sending}></span> :
                            sent == false ? "Registrar" : "Registrado!"
                        }    
                        </button>                  
                    
                </form>
                <p className={styles.ErrorMessage}>{errorMessage}</p>
                
            </section>
        </>
    )
}