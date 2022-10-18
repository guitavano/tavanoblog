import styles from './postImage.module.scss'


export default function PostImage({imageUrl, imageAlt}){

    if(imageUrl == "default"){
        return(
            <div className={styles.imageLetter}>
                <h2>{imageAlt[0]}</h2>
            </div>
        )
    }else{
        return(
            <img src={imageUrl} alt={imageAlt} className={styles.imageReal}/>
        )
    }


}