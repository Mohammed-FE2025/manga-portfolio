import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router'

import './index.css'

import Layout from './components/Layout'

import App from './App'
import MangaDetails from './pages/MangaDetails'
import About from './pages/About'
import NotFound from './pages/NotFound'

createRoot(
  document.getElementById('root')!,
).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route
            path="/"
            element={<App />}
          />

          <Route
            path="/manga/:id"
            element={<MangaDetails />}
          />

          <Route
            path="/about"
            element={<About />}
          />

          <Route
            path="*"
            element={<NotFound />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)