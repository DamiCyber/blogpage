import React, { useEffect, useState } from 'react'
import client from '../client'

const Home = () => {
  const [authors, setAuthors] = useState([])

  useEffect(() => {
    const query = `
      *[_type == "author"]{
        _id,
        name,
        bio,
        image{
          asset->{
            url
          }
        }
      }
    `

    client.fetch(query).then((data) => {
      setAuthors(data)
    })
  }, [])

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Authors</h1>

      <div style={styles.grid}>
        {authors.map((author) => (
          <div key={author._id} style={styles.card}>
            
            {author.image && (
              <img
                src={author.image.asset.url}
                alt={author.name}
                style={styles.image}
              />
            )}

            <h2>{author.name}</h2>

            <div style={styles.bio}>
              {author.bio?.map((block) => (
                <p key={block._key} style={styles.paragraph}>
                  {block.children?.map(child => child.text).join('')}
                </p>
              ))}
            </div>

          </div>
        ))}
      </div>
    </div>
  )
}

const styles = {
  container: {
    maxWidth: '1000px',
    margin: '0 auto',
    padding: '60px 20px',
    textAlign: 'center',
  },
  title: {
    fontSize: '2.5rem',
    marginBottom: '40px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '30px',
  },
  card: {
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
  },
  image: {
    width: '120px',
    height: '120px',
    objectFit: 'cover',
    borderRadius: '50%',
    marginBottom: '15px',
  },
  bio: {
    marginTop: '10px',
  },
  paragraph: {
    marginBottom: '10px',
    lineHeight: '1.6',
  }
}

export default Home