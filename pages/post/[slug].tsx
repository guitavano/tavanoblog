import styles from './post.module.scss'

import { createClient } from './../../prismicio'
import { GetStaticPaths } from 'next'
import { PrismicRichText } from '@prismicio/react'
import Head from 'next/head';
import { FiCalendar, FiUser } from 'react-icons/fi';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import PostList from './../components/postList/postList'
import * as prismic from '@prismicio/client'

import Link from 'next/link'
import Image from 'next/image';

import {useRouter} from 'next/router'

import Newsletter from './../components/newsletter/newsletter'

interface Post{
    uid: string;
    meta_title: string;
    meta_description: string;
    first_publication_date: string | null;
    author: string;
    category: string;
    data:{
        title: string;
        description: string;
        banner:{
            width: number;
            height: number;
            url: string
        };
        content: any;
    }
}

interface PostAtList {
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
    results: PostAtList[];
  }

  interface PostProps{
    post: Post;
    postList: Posts;
}
  

export default function Post({post, postList} : PostProps){

    const router = useRouter()

    return(
        <>
            <Head>
                <title>{post.meta_title}</title>
                <meta name="description" content={post.meta_description} />
                <script type="application/ld+json">
                    {
                    `{"@context": "https://schema.org","@type": "NewsArticle","mainEntityOfPage": {"@type": "WebPage","@id": "https://tavanoblog.com.br/${post.uid}"},"headline": "${post.data.title.replaceAll(`"`,`'`)}", "image": "${post.data.banner.url}", "datePublished": "${post.first_publication_date}","author": {"@type": "Person","name": "${post.author}"},"publisher": {"@type": "Organization","name": "TavanoBlog"}}`
                    }
                </script>
            </Head>
            <div className={`${styles.container} postContainer `}>
                <div className={styles.content}>
                    <h1>{post.data.title}</h1>    
                    <p>{post.data.description}</p>  

                    <div className={styles.info}>
                      <Link href={`/category/${post.category}`}>
                            <div className={`${styles.category} category ${post.category}`}>
                                    <p>{post.category}</p>
                            </div>
                      </Link>
                      <div>
                        <FiCalendar />
                        <p>{format(new Date(post.first_publication_date), "dd MMM uuuu", { locale: ptBR })}</p>
                      </div>
                      <div>
                        <FiUser />
                        <p>{post.author}</p>
                    </div>
                    </div>

                    <div className={styles.imageContainer}>
                        {post.data.banner.url ? 
                        <Image src={post.data.banner.url} alt={post.data.title} fill></Image>
                        : null}
                    </div>

                    <div className={styles.textContent}>
                        {
                            post.data.content.map((block, idx) => {
                                if(block.Text[0].type == 'preformatted'){
                                    let text = block.Text[0].text
                                    if(text.includes("https://codepen.io")){
                                        return(
                                            <div key={idx} dangerouslySetInnerHTML={{ __html: block.Text[0].text }} />
                                        )
                                    }else{
                                        return(
                                            <PrismicRichText 
                                            key={idx}
                                            field={block.Text}
                                            components={{
                                                paragraph: ({children}) => {
                                                        return <p className='paragraph'>{children}</p>
                                                }
                                            }}
                                            />  
                                        )
                                    }
                                    
                                }else{
                                    return(
                                        <PrismicRichText 
                                        key={idx}
                                        field={block.Text}
                                        components={{
                                            paragraph: ({children}) => {
                                                    return <p className='paragraph'>{children}</p>
                                            }
                                        }}
                                        />  
                                    )
                                }
                                     
                            })
                        }
                    </div>

                    <div className={styles.author}>
                        <FiUser />
                        <p>{post.author}</p>
                    </div>
                    <div className='postList '>
                        <h2>Mais posts</h2>
                    <PostList isHome={false} posts={postList}></PostList>
                    </div>
                    <Newsletter></Newsletter>
                </div>
            </div>

            
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
  
    const response = await client.getByUID('posts', String(slug))

    const banner = response.data.slices.find(slice => slice.slice_type == "banner")

     const post : Post = {
        uid: response.uid,
        meta_title: response.data.title[0].text,
        meta_description: response.data.metaDescription[0].text,
        first_publication_date: response.first_publication_date,
        author: response.data.author[0].text,
        category: response.data.Categoria[0].text,
        data:{
            title: response.data.slices.find(slice => slice.slice_type == "title_block").primary.title[0].text,
            description: response.data.slices.find(slice => slice.slice_type == "title_block").primary.description[0].text,
            banner:{
                width: banner? banner.primary.MainImage.dimensions.width : null,
                height: banner ? banner.primary.MainImage.dimensions.height : null,
                url: banner ? banner.primary.MainImage.url : null
            },
            content: response.data.slices.find(slice => slice.slice_type == "content").items
        }

    } 

    const clientList = createClient({ previewData })

    const responseList = await clientList.getByType('posts',{
      orderings: {
        field: 'document.first_publication_date',
        direction: 'desc',
      },
      predicates: [
        prismic.predicate.similar(response.id, 3)
      ],
      pageSize: 3
    })

    const postList : Posts = {
        next_page: responseList.next_page,
        results: responseList.results.map(result => {
    
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
      props: { post, postList },
    }
  }