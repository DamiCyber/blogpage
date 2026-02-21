import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import client from '../client'

const SinglePost = () => {
  const { slug } = useParams()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

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

    client
      .fetch(query, { slug })
      .then((data) => {
        setPost(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error(err)
        setError('Failed to load post. Please check your CORS settings in Sanity.')
        setLoading(false)
      })
  }, [slug])

  if (loading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px', padding: '2rem' }}>
        <div style={{ fontSize: '1.2rem', color: '#666' }}>Loading...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px', padding: '2rem' }}>
        <div style={{ 
          backgroundColor: '#fee', 
          border: '1px solid #fcc', 
          borderRadius: '8px', 
          padding: '1.5rem',
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          <h2 style={{ color: '#c33', marginBottom: '1rem' }}>Error Loading Post</h2>
          <p style={{ color: '#666' }}>{error}</p>
          <p style={{ color: '#666', marginTop: '1rem', fontSize: '0.9rem' }}>
            Make sure <strong>https://blogpage-chi.vercel.app</strong> is added as a CORS origin in your Sanity project settings.
          </p>
        </div>
      </div>
    )
  }

  if (!post) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px', padding: '2rem' }}>
        <div style={{ fontSize: '1.2rem', color: '#666' }}>Post not found</div>
      </div>
    )
  }

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