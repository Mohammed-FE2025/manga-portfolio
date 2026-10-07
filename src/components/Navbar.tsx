import { useState } from 'react'
import {
  Link,
  NavLink,
} from 'react-router'

function Navbar() {
  const [menuOpen, setMenuOpen] =
    useState(false)

  const navLinkClass = ({
    isActive,
  }: {
    isActive: boolean
  }) =>
    `rounded-lg px-3 py-2 text-sm font-medium transition ${
      isActive
        ? 'bg-red-500/10 text-red-400'
        : 'text-slate-300 hover:bg-slate-800 hover:text-white'
    }`

  function closeMenu() {
    setMenuOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/90 backdrop-blur-xl">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4"
      >
        {/* Logo */}

        <Link
          to="/"
          onClick={closeMenu}
          className="group text-2xl font-black tracking-tight text-white"
        >
          Manga
          <span className="text-red-500 transition group-hover:text-red-400">
            Verse
          </span>
        </Link>

        {/* Desktop navigation */}

        <div className="hidden items-center gap-2 md:flex">
          <NavLink
            to="/"
            end
            className={navLinkClass}
          >
            Discover
          </NavLink>

          <NavLink
            to="/about"
            className={navLinkClass}
          >
            About
          </NavLink>
        </div>

        {/* Mobile menu button */}

        <button
          type="button"
          onClick={() =>
            setMenuOpen(
              (current) => !current,
            )
          }
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          aria-label={
            menuOpen
              ? 'Close navigation menu'
              : 'Open navigation menu'
          }
          className="rounded-lg border border-slate-700 p-2 text-slate-300 transition hover:bg-slate-800 hover:text-white md:hidden"
        >
          <span
            className="text-xl leading-none"
            aria-hidden="true"
          >
            {menuOpen ? '✕' : '☰'}
          </span>
        </button>
      </nav>

      {/* Mobile navigation */}

      {menuOpen && (
        <div
          id="mobile-navigation"
          className="border-t border-slate-800 md:hidden"
        >
          <div className="mx-auto flex max-w-7xl flex-col gap-2 px-6 py-4">
            <NavLink
              to="/"
              end
              onClick={closeMenu}
              className={navLinkClass}
            >
              Discover
            </NavLink>

            <NavLink
              to="/about"
              onClick={closeMenu}
              className={navLinkClass}
            >
              About
            </NavLink>
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar