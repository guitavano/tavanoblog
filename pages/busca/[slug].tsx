import { createClient } from './../../prismicio'

import styles from './busca.module.scss'

import * as prismic from '@prismicio/client'

import PostList from '../components/postList/postList'

import Head from 'next/head';

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

interface SearchProps {
    posts: Posts;
    slug: string;
}


export default function Busca({posts, slug} : SearchProps){

    console.log(posts.results.length)

    const filteredPosts = {
        results: [],
        next_page: ''
    }

    filteredPosts.results = posts.results.filter(post => post.data.title.toLowerCase().includes(slug.toLowerCase()))

    console.log(posts.results.length)

    return(
        <>
            <Head>
                <title>TavanoBlog - Blog de tecnologia</title>
                <meta name="description" content="Blog de tecnologia com diversos assuntos sobre Desenvolvimento Web, E-commerce, Marketing Digital, Performance e muito mais!" />
                <meta name="robots" content="noindex" />
            </Head>
            <main className={styles.container}>
                {
                    filteredPosts.results.length > 0 &&
                    <>
                        <h1>Você buscou por: {slug}</h1>
                        <PostList isHome={false} posts={filteredPosts}></PostList>
                    </>
                }
                {
                    filteredPosts.results.length == 0 &&
                    <>
                        <h1>Não encontramos resultados para: {slug}</h1>
                        <h1>Veja outros posts</h1>
                        <PostList isHome={false} posts={posts}></PostList>
                    </>
                }
            </main>     
        </>
    )
}

export async function getServerSideProps({params, previewData }) {
    const {slug} = params

    const client = createClient({ previewData })
  
    const response = await client.get({
      orderings: {
        field: 'document.first_publication_date',
        direction: 'desc',
      },
    })
  
    const posts: Posts = {
      next_page: response.next_page,
      results: response.results.map(result => {

        let bannerExists = result.data.slices.find(slice => slice.slice_type == "banner")
      
        let banner = bannerExists ? bannerExists.primary.MainImage.url : "default"

        return {
          uid: result.uid,
          first_publication_date: result.first_publication_date,
          data: {
            category: result.data.Categoria[0].text,
            author: result.data.author[0].text,
            title: result.data.slices.find(slice => slice.slice_type == "title_block").primary.title[0].text,
            subtitle: result.data.slices.find(slice => slice.slice_type == "title_block").primary.description[0].text,
            image: banner
          }
        }
      })
    }
    
    return {
      props: { posts, slug }, // will be passed to the page component as props
    }
  }