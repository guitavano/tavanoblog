
import styles from './mainPosts.module.scss'

import Link from 'next/link'

import PostImage from '.././postImage/postImage'

interface Post {
    uid?: string;
    first_publication_date: string | null;
    data: {
      category: string;
      title: string;
      subtitle: string;
      author: string;
      image: string;
    };
}

interface Posts {
    next_page: string;
    results: Post[];
}

interface PostProps{
    posts: Posts;
}


export default function MainPost({posts} : PostProps){

    let limitedPosts = posts ? [posts?.results[0], posts?.results[1], posts?.results[2]] : undefined

    return(
        <>
            <div className={styles.mainImagesContainer}>

                {
                    limitedPosts?.map((post, idx) => {
                        if(idx == 0){
                            return(
                                <div className={styles.mainImage}>
                                    <Link href={`/post/${post.uid}`} key={post.uid}>
                                        <PostImage 
                                        imageUrl={post.data.image}
                                        imageAlt={post.data.title}></PostImage>
                                        <div className={styles.mainInfo}>
                                            <strong>{post.data.title}</strong>
                                        </div>
                                    </Link>
                                    <Link className={`category ${styles.category} ${post.data.category}`} href={`/categorie/${post.data.category}`}>
                                            <p>{post.data.category}</p>
                                    </Link>
                                </div>
                            )
                        }else{
                            return(
                                <div className={styles.subImages}>
                                    <Link href={`/post/${post.uid}`} key={post.uid}>
                                        <PostImage
                                        imageUrl={post.data.image}
                                        imageAlt={post.data.title}></PostImage>
                                        <strong>{post.data.title}</strong>
                                    </Link>
                                    <Link className={`category ${styles.category} ${post.data.category}`} href={`/categorie/${post.data.category}`}>
                                        <p>{post.data.category}</p>
                                    </Link>
                                </div>
                            )
                        }
                        
                    })
                }

            </div>
        </>
    )
}