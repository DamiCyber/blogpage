import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import client from '../client'
import './Header.css'

// Helper function to extract plain text from portable text blocks
const extractText = (blocks) => {
  if (!blocks || !Array.isArray(blocks)) return ''
  return blocks
    .map((block) => {
      if (block._type !== 'block' || !block.children) {
        return ''
      }
      return block.children.map((child) => child.text || '').join('')
    })
    .join(' ')
    .trim()
}

const Blog = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    client
      .fetch(`*[_type == "post"]{_id, title, slug, body, mainImage{asset->{_id, url}}}`)
      .then((data) => {
        setPosts(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error(err)
        setError(
          'Failed to load posts. This is usually a CORS / permissions issue. ' +
          'Make sure http://localhost:5173 is added as a CORS origin in your Sanity project API settings.'
        )
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-10 w-10 border-2 border-gray-300 border-t-blue-600 mb-4"></div>
          <p className="text-gray-600 text-base">Loading posts...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md w-full shadow-sm">
          <h2 className="text-red-800 font-semibold text-base mb-2">Error Loading Posts</h2>
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-7xl">
        {/* Header Section */}
        <header className="text-center mb-10 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
            welcome to our sanity Blog
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
          You are viewing {posts.length} Blog
          </p>
        </header>

        {posts.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-white rounded-lg shadow-sm p-8 max-w-md mx-auto">
              <p className="text-gray-500 text-base">No posts found.</p>
              <p className="text-gray-400 text-sm mt-2">Check back later for new content!</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {posts.map((post) => (
              <article 
                key={post._id} 
                className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col group"
              >
                {/* Image Section */}
                {post.mainImage?.asset?.url && (
                  <div className="blog-image-container h-44 sm:h-52 lg:h-56 w-full overflow-hidden">
                    <img
                      src={post.mainImage.asset.url}
                      alt={post.title || 'Blog post image'}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                
                {/* Content Section */}
                <div className="p-5 sm:p-6 flex-grow flex flex-col">
                  <h2 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-gray-900 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
                    {post.title || 'Untitled'}
                  </h2>
                  
                  {post.body && (
                    <p className="text-sm sm:text-base text-gray-600 mb-4 flex-grow leading-relaxed line-clamp-3">
                      {extractText(post.body).substring(0, 120)}
                      {extractText(post.body).length > 120 ? '...' : ''}
                    </p>
                  )}
                  
                  {post.slug?.current && (
                    <Link
                      to={`/blog/${post.slug.current}`}
                      className="blog-read-more text-blue-600 hover:text-blue-700 font-medium text-sm sm:text-base mt-auto inline-block w-fit"
                    >
                      Read more
                      <svg 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Blog