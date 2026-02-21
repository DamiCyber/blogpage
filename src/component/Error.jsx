import React from 'react'

const Error = () => {
  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.code}>404</h1>
        <p style={styles.message}>Page Not Found</p>
      </div>
    </div>
  )
}

const styles = {
  container: {
    height: '80vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  content: {
    textAlign: 'center',
  },
  code: {
    fontSize: '6rem',
    margin: 0,
    color: '#dc3545',
  },
  message: {
    fontSize: '1.5rem',
    marginTop: '10px',
    color: '#6c757d',
  },
}

export default Error