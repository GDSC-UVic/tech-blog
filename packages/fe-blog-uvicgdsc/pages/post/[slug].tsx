// ./frontend/pages/post/[slug].tsx

import client from '../../client'
import { toHTML } from '@portabletext/to-html'

const Post = ({
  post,
}: {
  post: {
    slug: {
      current: string
    }
    body: any[]
  }
}) => {
  console.log('post', post)
  return (
    <article>
      <h1>{post?.slug?.current}</h1>
      <article
        dangerouslySetInnerHTML={{
          __html: toHTML(post?.body),
        }}
      />
    </article>
  )
}

export async function getStaticPaths() {
  const paths = await client.fetch(
    `*[_type == "post" && defined(slug.current)][].slug.current`
  )

  return {
    paths: paths.map((slug: any) => ({ params: { slug } })),
    fallback: true,
  }
}

export async function getStaticProps(context: any) {
  // It's important to default the slug so that it doesn't return "undefined"
  const { slug = '' } = context.params
  const post = await client.fetch(
    `
    *[_type == "post" && slug.current == $slug][0]
  `,
    { slug }
  )

  return {
    props: {
      post,
    },
  }
}

export default Post
