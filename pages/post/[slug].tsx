import styles from './post.module.scss'

import { createClient } from './../../prismicio'
import { GetStaticPaths } from 'next'
import { PrismicRichText } from '@prismicio/react'
import Head from 'next/head';
import { Children } from 'react';

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

    console.log(post)

    return(
        <>
            <Head>
                <title>{post.meta_title}</title>
                <meta name="description" content={post.meta_description} />
            </Head>
            <div className={styles.container}>
                <div className={styles.content}>
                    <h1>{post.data.title}</h1>    
                    <p>{post.data.description}</p>  

                    <img src={post.data.banner.url} alt="" />
                    
                    {
                        post.data.content.map((block, idx) => {
                            return(
                                <PrismicRichText 
                                key={idx}
                                field={block.Text}
                                components={{
                                    paragraph: ({children}) => <p className='paragraph'>{children}</p>
                                }}
                                />  
                            )
                            
                        })
                    }
   
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
                width: response.data.slices.find(slice => slice.slice_type == "banner").primary.MainImage.dimensions.width,
                height: response.data.slices.find(slice => slice.slice_type == "banner").primary.MainImage.dimensions.height,
                url: response.data.slices.find(slice => slice.slice_type == "banner").primary.MainImage.url
            },
            content: response.data.slices.find(slice => slice.slice_type == "content").items
        }

    } 

    return {
      props: { post },
    }
  }