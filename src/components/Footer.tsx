import { Link } from 'react-router'

function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="grid gap-8 sm:grid-cols-2 sm:items-center">

          {/* Brand */}

          <div>
            <Link
              to="/"
              className="text-xl font-black text-white"
            >
              Manga
              <span className="text-red-500">
                Verse
              </span>
            </Link>

            <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
              A manga discovery portfolio project built
              with React, TypeScript, Tailwind CSS and
              the MangaDex API.
            </p>
          </div>

          {/* Links */}

          <div className="flex gap-5 sm:justify-end">
            <Link
              to="/"
              className="text-sm text-slate-400 transition hover:text-white"
            >
              Discover
            </Link>

            <Link
              to="/about"
              className="text-sm text-slate-400 transition hover:text-white"
            >
              About
            </Link>
          </div>
        </div>

        {/* Bottom */}

        <div className="mt-8 flex flex-col gap-2 border-t border-slate-900 pt-6 text-xs text-slate-600 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} MangaVerse
          </p>

          <p>
            Manga data provided by MangaDex.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer