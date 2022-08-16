import styles from './post.module.scss'

import { createClient } from './../../prismicio'
import { GetStaticPaths } from 'next'
import { PrismicRichText } from '@prismicio/react'
import Head from 'next/head';
import { Children } from 'react';
import { FiCalendar, FiUser } from 'react-icons/fi';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import {useRouter} from 'next/router'

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

interface PostProps{
    post: Post;
}

export default function Post({post} : PostProps){

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
            <div className={styles.container}>
                <div className={styles.content}>
                    <h1>{post.data.title}</h1>    
                    <p>{post.data.description}</p>  

                    <div className={styles.info}>
                      <div>
                        <FiCalendar />
                        <p>{format(new Date(post.first_publication_date), "dd MMM uuuu", { locale: ptBR })}</p>
                      </div>
                    </div>

                    {post.data.banner.url ?  <img src={post.data.banner.url} alt="" /> : null}

                    

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

    return {
      props: { post },
    }
  }