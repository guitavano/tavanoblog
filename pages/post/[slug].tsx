import styles from './post.module.scss'

import { createClient } from './../../prismicio'
import { GetStaticPaths } from 'next'
import { PrismicRichText, PrismicText } from '@prismicio/react'

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
            <div className={styles.container}>
                <div className={styles.content}>
                    <h1>Post</h1>          
                    <div>
                    {
                        post.data.content.map((text, idx) => {
                            return(
                                <div key={idx}>
                                    <PrismicRichText field={text} />
                                </div>                   
                            )
                        })
                    }
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