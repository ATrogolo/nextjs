import classNames from "classnames"
import Link from "next/link"
import styles from "../../styles/Home.module.css"

export async function getStaticProps(ctx) {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts`)
  const posts = await response.json()

  return {
    revalidate: 60,
    props: {
      posts,
    },
  }
}

export default function Posts({ posts }) {
  return (
    <div className={classNames(styles.main, styles.code)}>
      <h1>All posts</h1>
      <ul>
        {posts.map(post => {
          return (
            <li key={post.id}>
              <Link href={`/posts/${post.id}`}>{post.title}</Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
