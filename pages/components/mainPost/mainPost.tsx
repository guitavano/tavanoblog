import styles from './mainPost.module.scss'

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

export default function MainPost({posts}: PostProps){
    let firstPost = posts.results[0]

    return(
        <>
            <div>
            </div>
        </>
    )
}