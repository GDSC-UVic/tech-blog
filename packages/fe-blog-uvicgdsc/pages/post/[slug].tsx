// ./frontend/pages/post/[slug].tsx

import client from '../../client'
import { PortableText } from '@portabletext/react'
import imageUrlBuilder from '@sanity/image-url'
const builder = imageUrlBuilder(client)

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
  function urlFor(source: any) {
    return builder.image(source)
  }
  const myPortableTextComponents = {
    types: {
      image: ({
        value,
      }: {
        value: {
          asset: {
            _type: string
            _ref: string
          }
          _type: string
          _key: string
        }
      }) => {
        let width
        console.log(value)
        if (value._key === '5663b8941afa') {
          width = 600
        }
        return (
          <img
            className="tw-mx-auto"
            src={String(urlFor(value.asset._ref).url())}
            width={width}
          />
        )
      },
    },
  }
  return (
    <div>
      <article
        className="tw-prose tw-max-w-[100vw] tw-text-grey tw-p-[40px] "
        // dangerouslySetInnerHTML={{ __html: toHTML(post?.body) }}
      >
        <PortableText
          value={post?.body}
          components={myPortableTextComponents}
        />
      </article>
    </div>
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
