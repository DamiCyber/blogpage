import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './component/Header'
import Home from './component/Home'
import Blog from './component/Blog'
import SinglePost from './component/SinglePost'
import Error from './component/Error'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<Home />} />
          <Route path="blog" element={<Blog />} />
          <Route path="blog/:slug" element={<SinglePost />} />
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
