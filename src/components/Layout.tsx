import { Outlet } from 'react-router'

import Navbar from './Navbar'
import Footer from './Footer'

function Layout() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-950 text-white">
      <Navbar />

      <div className="flex-1">
  <Outlet />
</div>

      <Footer />
    </div>
  )
}

export default Layout