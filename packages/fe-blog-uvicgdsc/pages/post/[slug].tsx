// // ./frontend/pages/post/[slug].tsx

// import client from '../../client'
// import { PortableText } from '@portabletext/react'
// import imageUrlBuilder from '@sanity/image-url'
// const builder = imageUrlBuilder(client)

// const Post = ({
//   post,
// }: {
//   post: {
//     title: string
//     slug: {
//       current: string
//     }
//     body: any[]
//   }
// }) => {
//   function urlFor(source: any) {
//     return builder.image(source)
//   }
//   const myPortableTextComponents = {
//     types: {
//       image: ({
//         value,
//       }: {
//         value: {
//           asset: {
//             _type: string
//             _ref: string
//           }
//           _type: string
//           _key: string
//         }
//       }) => {
//         let width
//         console.log(value)
//         if (value._key === '5663b8941afa') {
//           width = 600
//         }
//         return (
//           <img
//             className="tw-mx-auto"
//             src={String(urlFor(value.asset._ref).url())}
//             width={width}
//           />
//         )
//       },
//     },
//   }
//   return (
//     <div>
//       <article
//         className="tw-prose tw-max-w-[100vw] tw-text-grey tw-p-[40px] "
//         // dangerouslySetInnerHTML={{ __html: toHTML(post?.body) }}
//       >
//         <div>
//           <h1>{post?.title}</h1>
//         </div>
//         <div>
//           {/* <h2>{post?.name}</h2> */}
//         </div>
//         <div>
//           {/* {post?.authorImage} */}
//           {/* <img
//             className="tw-object-cover tw-rounded-full tw-h-[50px] tw-w-[50px]"
//             src={urlFor(post?.authorImage).url()}
//           /> */}
//         </div>

//         <PortableText
//           value={post?.body}
//           components={myPortableTextComponents}
//         />
//       </article>
//     </div>
//   )
// }

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

// export default Post

// [slug].tsx

// import groq from 'groq'
// import imageUrlBuilder from '@sanity/image-url'
// import {PortableText} from '@portabletext/react'
// import client from '../../client'

// function urlFor (source) {
//   return imageUrlBuilder(client).image(source)
// }

// const ptComponents = {
//   types: {
//     image: ({ value }) => {
//       if (!value?.asset?._ref) {
//         return null
//       }
//       return (
//         <img
//           alt={value.alt || ' '}
//           loading="lazy"
//           src={urlFor(value).width(320).height(240).fit('max').auto('format')}
//         />
//       )
//     }
//   }
// }

// const Post = ({post}) => {
//   const {
//     title = 'Missing title',
//     name = 'Missing name',
//     categories,
//     authorImage,
//     body = []
//   } = post
//   return (
//     <article>
//       <h1>{title}</h1>
//       <span>By {name}</span>
//       {categories && (
//         <ul>
//           Posted in
//           {categories.map(category => <li key={category}>{category}</li>)}
//         </ul>
//       )}
//       {authorImage && (
//         <div>
//           <img
//             src={urlFor(authorImage)
//               .width(50)
//               .url()}
//             alt={`${name}'s picture`}
//           />
//         </div>
//       )}
//       <PortableText
//         value={body}
//         components={ptComponents}
//       />
//     </article>
//   )
// }

// const query = groq`*[_type == "post" && slug.current == $slug][0]{
//   title,
//   "name": author->name,
//   "categories": categories[]->title,
//   "authorImage": author->image,
//   body
// }`
// export async function getStaticPaths() {
//   const paths = await client.fetch(
//     groq`*[_type == "post" && defined(slug.current)][].slug.current`
//   )

//   return {
//     paths: paths.map((slug) => ({params: {slug}})),
//     fallback: true,
//   }
// }

// export async function getStaticProps(context) {
//   // It's important to default the slug so that it doesn't return "undefined"
//   const { slug = "" } = context.params
//   const post = await client.fetch(query, { slug })
//   return {
//     props: {
//       post
//     }
//   }
// }
// export default Post

// [slug].tsx

import groq from 'groq'
import imageUrlBuilder from '@sanity/image-url'
import { PortableText } from '@portabletext/react'
import client from '../../client'
import { Avatar, Container } from '@mui/material'
import { grey } from '@mui/material/colors'
import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'

function urlFor(source) {
  return imageUrlBuilder(client).image(source)
}

const ptComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) {
        return null
      }
      return (
        <img
          alt={value.alt || ' '}
          loading="lazy"
          src={urlFor(value).fit('max').auto('format')}
        />
      )
    },
  },
}

const Post = ({ post }) => {
  const {
    title = 'Missing title',
    name = 'Missing name',
    authorImage,
    publishedAt,
    body = [],
  } = post
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }))
  return (
    <article className="tw-prose tw-max-w-[100vw] tw-text-grey tw-px-[400px] tw-py-[30px]">
      <h1>{title}</h1>
      <Grid container spacing={2}>
        <Grid item xs={1}>
          <Avatar sx={{ bgcolor: grey[500] }} alt={name} />
        </Grid>
        <Grid item xs={11}>
          <span className="tw-text-lg">By {name}</span>
        </Grid>
      </Grid>
      <Container className="tw-pt-[20px]">
        <Box sx={{ bgcolor: grey[200], height: '5px', width: 'auto' }} />
      </Container>
      {authorImage && (
        <div>
          <img src={urlFor(authorImage).url()} alt={`${name}'s picture`} />
        </div>
      )}
      <PortableText value={body} components={ptComponents} />
    </article>
  )
}

const query = groq`*[_type == "post" && slug.current == $slug][0]{
  title,
  "name": author->name,
  "categories": categories[]->title,
  "authorImage": author->image,
  "publishedAt": author->publishedAt,
  body
}`
export async function getStaticPaths() {
  const paths = await client.fetch(
    groq`*[_type == "post" && defined(slug.current)][].slug.current`
  )

  return {
    paths: paths.map((slug) => ({ params: { slug } })),
    fallback: true,
  }
}

export async function getStaticProps(context) {
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
