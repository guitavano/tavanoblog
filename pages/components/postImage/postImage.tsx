import styles from './postImage.module.scss'
import Image from 'next/image'


export default function PostImage({imageUrl, imageAlt}){

    if(imageUrl == "default"){
        return(
            <div className={styles.imageLetter}>
                <h2>{imageAlt[0]}</h2>
            </div>
        )
    }else{
        return(
            <Image src={imageUrl} alt={imageAlt} className={styles.imageReal} fill/>
        )
    }


}