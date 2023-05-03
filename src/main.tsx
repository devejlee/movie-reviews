import React from 'react'
import ReactDOM from 'react-dom/client'
import Home from './pages/Home'
import Todo from './pages/Todo'
import VideoPlayer from './pages/VideoPlayer'
import './index.scss'
import { BrowserRouter, Route, Routes, Link } from "react-router-dom"

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/todo">Todo</Link></li>
          <li><Link to="/videoPlayer">VideoPlayer</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/todo" element={<Todo />} />
        <Route path="/videoPlayer" element={<VideoPlayer />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
