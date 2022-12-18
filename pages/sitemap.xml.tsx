import { createClient } from '../prismicio'

interface Post {
  uid?: string;
  data: {
    category: string;
  };
}

interface Posts {
  next_page: string;
  results: Post[];
}

interface SiteMapProps {
  posts: Posts;
}
  

function generateSiteMap({posts} : SiteMapProps){

  let categories = []

  posts.results.map(post =>{
    if(!categories.includes(post.data.category)){
      categories.push(post.data.category) 
    }
  })
    
    return `<?xml version="1.0" encoding="UTF-8"?>
                <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
                <url>
                    <loc>https://tavanoblog.com.br/</loc>
                </url>
                ${posts.results.map((post, idx) => {
                    return `
                    <url id="${idx}">
                        <loc>${`https://tavanoblog.com.br/post/${post.uid}`}</loc>
                    </url>
                `;
                    })
                    .join('')}

                ${categories.map((category, idx) => {
                  return `
                  <url id="${idx}">
                      <loc>${`https://tavanoblog.com.br/category/${category}`}</loc>
                  </url>
              `;
                  })
                  .join('')}
                </urlset>
            `;
}

function SiteMap(){

}

export async function getServerSideProps({ previewData, res }) {
    const client = createClient({ previewData })

    const response = await client.getByType('posts',{
      orderings: {
      field: 'document.first_publication_date',
      direction: 'desc'
    }})

    const posts: Posts = {
      next_page: response.next_page,
      results: response.results.map(result => {
        return {
          uid: result.uid,
          data: {
            category: result.data.Categoria[0].text,
          }
        }
      })
    }

    const props = {
      posts
    }

    const sitemap = generateSiteMap(props)

    res.setHeader('Content-Type', 'text/xml');
      // we send the XML to the browser
    res.write(sitemap);
    res.end();

    return {
      props: {},
    }
}

export default SiteMap;