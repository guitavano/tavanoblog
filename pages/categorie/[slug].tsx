import styles from './categorie.module.scss'

import { createClient } from './../../prismicio'
import { GetStaticPaths } from 'next'
import Head from 'next/head';

import * as prismic from '@prismicio/client'

import {useRouter} from 'next/router'

import PostList from '../components/postList/postList'

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
  
interface CategorieProps {
    posts: Posts;
    slug: String;
}

export default function Categorie({ posts, slug }: CategorieProps){


    return(
        <>
            <Head>
                <title>TavanoBlog - Blog de tecnologia</title>
                <meta name="description" content="Blog de tecnologia com diversos assuntos sobre Desenvolvimento Web, E-commerce, Marketing Digital, Performance e muito mais!" />
            </Head>
            <main className={styles.container}>
                <h1>{slug.toUpperCase()}</h1>
                <PostList posts={posts}></PostList>
            </main>     
        </>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
      paths: [],
      fallback: 'blocking',
    }
  };

export async function getStaticProps({ params, previewData }) {

    const {slug} = params

    const client = createClient({ previewData })
  
    const response = await client.get({
      predicates: [
        prismic.predicate.at('document.type', 'posts'),
        prismic.predicate.fulltext('my.posts.Categoria', slug)
      ],
      orderings: {
        field: 'document.first_publication_date',
        direction: 'desc',
      },
    })
  
    const posts: Posts = {
      next_page: response.next_page,
      results: response.results.map(result => {
        return {
          uid: result.uid,
          first_publication_date: result.first_publication_date,
          data: {
            category: result.data.Categoria[0].text,
            author: result.data.author[0].text,
            title: result.data.slices.find(slice => slice.slice_type == "title_block").primary.title[0].text,
            subtitle: result.data.slices.find(slice => slice.slice_type == "title_block").primary.description[0].text,
          }
        }
      })
    }
  
    return {
      props: { posts, slug },
    }
  }
  