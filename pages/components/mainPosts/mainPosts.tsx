
import styles from './mainPosts.module.scss'
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

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

    let limitedPosts = [posts?.results[0], posts?.results[1], posts?.results[2]]

    return(
        <>
            <div className={styles.mainImagesContainer}>

                {
                    limitedPosts?.map((post, idx) => {
                        if(idx == 0){
                            return(
                                <Link href={`/post/${post.uid}`} key={post.uid}>
                                    <div className={styles.mainImage}>
                                        <PostImage 
                                        imageUrl={post.data.image}
                                        imageAlt={post.data.title}></PostImage>
                                        <div className={styles.mainInfo}>
                                            <strong>{post.data.title}</strong>
                                            <Link href={`/categorie/${post.data.category}`}>
                                                <div className={`category ${styles.category} ${post.data.category}`}>
                                                    <p>{post.data.category}</p>
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                </Link>
                            )
                        }else{
                            return(
                                <Link href={`/post/${post.uid}`} key={post.uid}>
                                    <div className={styles.subImages}>
                                        <PostImage
                                        imageUrl={post.data.image}
                                        imageAlt={post.data.title}></PostImage>
                                        <strong>{post.data.title}</strong>
                                        <Link href={`/categorie/${post.data.category}`}>
                                            <div className={`category ${styles.category} ${post.data.category}`}>
                                                <p>{post.data.category}</p>
                                            </div>
                                        </Link>
                                    </div>
                                </Link>
                            )
                        }
                        
                    })
                }

            </div>
        </>
    )
}