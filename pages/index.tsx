import styles from './home.module.scss'
import { FiUser, FiCalendar } from 'react-icons/fi'
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { createClient } from '../prismicio'

import Head from 'next/head'
import Link from 'next/link'

interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
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
  console.log(posts)
  return (
    <>
      <Head>
        <title>TavanoBlog - Blog de tecnologia</title>
      </Head>
      <main className={styles.container}>
        <div className={styles.posts}>
          {
            posts.results.map(post => {
              return (
                <Link href={`/post/${post.uid}`} key={post.uid}>
                  <a>
                    <strong>{post.data.title}</strong>
                    <p>{post.data.subtitle}</p>
                    <div className={styles.info}>
                      <div>
                        <FiCalendar />
                        <p>{format(new Date(post.first_publication_date), "dd MMM uuuu", { locale: ptBR })}</p>
                      </div>
                      <div>
                        <FiUser />
                        <p>{post.data.author}</p>
                      </div>
                    </div>
                  </a>
                </Link>
              )
            })
          }
        </div>
      </main>
    </>
  )
}

export async function getStaticProps({ previewData }) {
  const client = createClient({ previewData })

  const response = await client.getByType('posts')

  const posts: Posts = {
    next_page: response.next_page,
    results: response.results.map(result => {
      return {
        uid: result.uid,
        first_publication_date: result.first_publication_date,
        data: {
          author: result.data.author[0].text,
          title: result.data.slices.find(slice => slice.slice_type == "title_block").primary.title[0].text,
          subtitle: result.data.slices.find(slice => slice.slice_type == "title_block").primary.description[0].text,
        }
      }
    })
  }

  return {
    props: { posts },
  }
}
