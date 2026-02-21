import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import client from '../client'

const SinglePost = () => {
  const { slug } = useParams()
  const [post, setPost] = useState(null)

  useEffect(() => {
    if (!slug) return

    const query = `
      *[_type == "post" && slug.current == $slug][0]{
        title,
        body,
        mainImage{
          asset->{
            url
          }
        }
      }
    `

    client.fetch(query, { slug }).then((data) => {
      setPost(data)
    })
  }, [slug])

  if (!post) return <div style={{ textAlign: 'center', marginTop: '50px' }}>Loading...</div>

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>{post.title}</h1>

      {post.mainImage && (
        <img
          src={post.mainImage.asset.url}
          alt={post.title}
          style={styles.image}
        />
      )}

      <div style={styles.body}>
        {post.body?.map((block) => (
          <p key={block._key} style={styles.paragraph}>
            {block.children?.map(child => child.text).join('')}
          </p>
        ))}
      </div>
    </div>
  )
}

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '60px 20px',
    textAlign: 'center',
  },
  title: {
    fontSize: '2.5rem',
    marginBottom: '30px',
  },
  image: {
    width: '100%',
    maxWidth: '600px',
    margin: '0 auto 30px auto',
    display: 'block',
    borderRadius: '10px',
  },
  body: {
    marginTop: '20px',
  },
  paragraph: {
    marginBottom: '20px',
    fontSize: '1.1rem',
    lineHeight: '1.7',
  }
}

export default SinglePost