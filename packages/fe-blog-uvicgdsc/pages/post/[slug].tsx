// ./frontend/pages/post/[slug].tsx

import client from '../../client'
import { PortableText } from '@portabletext/react'
import imageUrlBuilder from '@sanity/image-url'
const builder = imageUrlBuilder(client)
import groq from 'groq'
import { Avatar, Container } from '@mui/material'
import { grey } from '@mui/material/colors'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'

const Post = ({
  post,
}: {
  post: {
    title: string
    name: string
    _updatedAt: string
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
  function formatDateString(inputDateString: string): string {
    const inputDate = new Date(inputDateString)

    const month = String(inputDate.getMonth() + 1).padStart(2, '0')
    const day = String(inputDate.getDate()).padStart(2, '0')
    const year = inputDate.getFullYear()

    return `${month}/${day}/${year}`
  }
  return (
    <div className="tw-mx-auto">
      <article
        className="tw-prose tw-max-w-[100vw] tw-text-grey tw-px-[400px] tw-py-[30px]"
        // dangerouslySetInnerHTML={{ __html: toHTML(post?.body) }}
      >
        <h1 className="tw-text-4xl tw-font-bold tw-text-center">
          {post?.title}
        </h1>
        <Grid container spacing={2}>
          <Grid item xs={1}>
            <Avatar
              sx={{ bgcolor: grey[500] }}
              alt={post?.name}
              src="./broken_image.png"
            />
          </Grid>
          <Grid item xs={11}>
            <b className="tw-text-lg">By {post?.name}</b>
            <h6>Updated At: {formatDateString(post?._updatedAt)}</h6>
          </Grid>
        </Grid>

        <Container className="tw-pt-[20px]">
          <Box sx={{ bgcolor: grey[200], height: '5px', width: 'auto' }} />
        </Container>

        <PortableText
          value={post?.body}
          components={myPortableTextComponents}
        />
      </article>
    </div>
  )
}

// export async function getStaticPaths() {
//   const paths = await client.fetch(
//     `*[_type == "post" && defined(slug.current)][].slug.current`
//   )

//   return {
//     paths: paths.map((slug: any) => ({ params: { slug } })),
//     fallback: true,
//   }
// }

// export async function getStaticProps(context: any) {
//   // It's important to default the slug so that it doesn't return "undefined"
//   const { slug = '' } = context.params
//   const post = await client.fetch(
//     `
//     *[_type == "post" && slug.current == $slug][0]
//   `,
//     { slug }
//   )

//   return {
//     props: {
//       post,
//     },
//   }
// }

const query = groq`*[_type == "post" && slug.current == $slug][0]{
  title,
  "name": author->name,
  "categories": categories[]->title,
  "authorImage": author->image,
  _updatedAt,
  body
}`
export async function getStaticPaths() {
  const paths = await client.fetch(
    groq`*[_type == "post" && defined(slug.current)][].slug.current`
  )

  return {
    paths: paths.map((slug: any) => ({ params: { slug } })),
    fallback: true,
  }
}

export async function getStaticProps(context: any) {
  // It's important to default the slug so that it doesn't return "undefined"
  const { slug = '' } = context.params
  const post = await client.fetch(query, { slug })
  return {
    props: {
      post,
    },
  }
}

export default Post
