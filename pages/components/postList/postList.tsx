import styles from './postList.module.scss'

import { FiUser, FiCalendar } from 'react-icons/fi'
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import Link from 'next/link'
import { useEffect, useState } from 'react';

import Tilt from './../../../components/VanillaTilt/index'
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
    isHome: boolean;
}

export default function PostList({posts, isHome}: PostProps){

    const [search, setSearch] = useState('')

    const options = {
        scale: 1,
        speed: 3000,
        max: 5
    };

    // let filteredPosts = search.length > 0
    // ? posts.results.filter(post => {
    //     if(post.data.title.toLowerCase().includes(search)){
    //         return post
    //     }
    //     if(post.data.category.toLowerCase().includes(search)){
    //         return post
    //     }
    // })
    // : (posts ?
    //     [...posts.results.filter((post,idx) => ![0,1,2].includes(idx))] 
    //     : [])

    let filteredPosts = []
    if(isHome){
         filteredPosts = (posts ? [...posts.results.filter((post,idx) => ![0,1,2].includes(idx))]  : []) 
    }else{
        filteredPosts = (posts ? [...posts.results]  : []) 
    }

    return(
        <>
            <div className={styles.posts}>
                <input placeholder='Search' type="text" onChange={e => {setSearch(e.target.value.toLowerCase())}}/>
                {
                filteredPosts.map(post => {
                    return (
                        <>
                            <Tilt className={styles.cardAtList} key={post.uid} options={options}>
                                <Link href={`/post/${post.uid}`}>
                                    <PostImage
                                    imageUrl={post.data.image}
                                    imageAlt={post.data.title}></PostImage>
                                    <strong>{post.data.title}</strong>
                                </Link>
                                <Link className={`category ${styles.category} ${post.data.category}`} href={`/category/${post.data.category}`}>
                                    <p>{post.data.category}</p>
                                </Link>
                            </Tilt>
                        </>
                    )
                })
                }
            </div>
        </>
    )
}