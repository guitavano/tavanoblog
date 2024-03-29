import styles from './home.module.scss'

import { createClient } from '../prismicio'

import Head from 'next/head'

import PostList from './components/postList/postList'
import MainPost from './components/mainPosts/mainPosts'
import CategoryCarousel from './components/categoryCarousel/categoryCarousel'
import Newsletter from './components/newsletter/newsletter'

interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    category: string;
    title: string;
    subtitle: string;
    author: string;
    image: string
  };
}

interface Posts {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  posts: Posts;
}


export default function Home({ posts }: HomeProps) {

  return (
    <>
      <Head>
        <title>TavanoBlog - Blog de tecnologia</title>
        <meta name="description" content="Blog de tecnologia com diversos assuntos sobre Desenvolvimento Web, E-commerce, Marketing Digital, Performance e muito mais!" />
      </Head>
      <main className={styles.container}>
        <MainPost posts={posts}></MainPost>
        <CategoryCarousel></CategoryCarousel>
        <Newsletter></Newsletter>
        <PostList isHome={true} posts={posts}></PostList>
      </main>
    </>
  )
}

export async function getStaticProps({ previewData }) {
  const client = createClient({ previewData })

  const response = await client.getByType('posts',{
    orderings: {
    field: 'document.first_publication_date',
    direction: 'desc'
  }})

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
    props: { posts },
  }
}
