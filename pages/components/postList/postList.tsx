import styles from './postList.module.scss'

import { FiUser, FiCalendar } from 'react-icons/fi'
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import Link from 'next/link'
import { useEffect, useState } from 'react';

interface Post {
    uid?: string;
    first_publication_date: string | null;
    data: {
      category: string;
      title: string;
      subtitle: string;
      author: string;
    };
}

interface Posts {
    next_page: string;
    results: Post[];
}

interface PostProps{
    posts: Posts;
}

export default function PostList({posts}: PostProps){

    const [search, setSearch] = useState('')

    let filteredPosts = search.length > 0
    ? posts.results.filter(post => {
        if(post.data.title.toLowerCase().includes(search)){
            return post
        }
        if(post.data.category.toLowerCase().includes(search)){
            return post
        }
    })
    : (posts ? [...posts.results] : [])

    return(
        <>
            <div className={styles.posts}>
                <input placeholder='Search' type="text" onChange={e => {setSearch(e.target.value.toLowerCase())}}/>
                {
                filteredPosts.map(post => {
                    return (
                        <div key={post.uid}>
                            <Link className={styles.listContent} href={`/post/${post.uid}`}>
                                <strong>{post.data.title}</strong>
                                <div className={styles.info}>
                                    <div>
                                        <FiUser />
                                        <p>{post.data.author}</p>
                                    </div>
                                </div>
                            </Link>
                            <Link className={`category ${styles.category} ${post.data.category}`} href={`/category/${post.data.category}`}>
                                <p>{post.data.category}</p>
                            </Link>
                        </div>
                    
                    )
                })
                }
            </div>
        </>
    )
}