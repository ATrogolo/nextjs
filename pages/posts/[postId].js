import classNames from "classnames"
import Link from "next/link"
import styles from "../../styles/Home.module.css"
import postsStyles from "../../styles/posts.module.scss"

// export async function getServerSideProps(ctx) {
//   const { postId } = ctx.params

//   const response = await fetch(
//     `https://jsonplaceholder.typicode.com/posts/${postId}`
//   )
//   const post = await response.json()

//   return {
//     props: {
//       post,
//     },
//   }
// }

export async function getStaticPaths(ctx) {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts`)
  const posts = await response.json()

  return {
    fallback: false,
    paths: posts.map(post => {
      return { params: { postId: "" + post.id } }
    }),
  }
}

export async function getStaticProps(ctx) {
  const { postId } = ctx.params

  const postResponse = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${postId}`
  )
  const post = await postResponse.json()

  const commentsResponse = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
  )
  const comments = await commentsResponse.json()

  return {
    props: {
      post,
      comments,
    },
  }
}

export default function Post({ post, comments }) {
  return (
    <div className={classNames(styles.main, styles.code)}>
      <Link className={postsStyles.back} href="/posts">
        {"< Back to home"}
      </Link>

      <h1>Post #{post.id}</h1>

      <h3>Title: {post.title}</h3>
      <div>{post.body}</div>

      <div>
        <h3 className={postsStyles.commentsTitle}>Comments</h3>
        <div className={postsStyles.comments}>
          {comments.map(comment => {
            return (
              <div key={comment.id} className={postsStyles.comment}>
                {comment.body}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
