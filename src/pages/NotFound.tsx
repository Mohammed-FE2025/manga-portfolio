import { Link } from 'react-router'

function NotFound() {
  return (
    <main className="relative flex min-h-[70vh] items-center overflow-hidden">
      {/* Background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-600/10 blur-3xl" />

        <div className="absolute inset-0 opacity-15 [background-image:radial-gradient(circle,rgba(255,255,255,0.2)_1px,transparent_1px)] [background-size:18px_18px]" />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-6 py-20">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_auto]">
          <div>
            <div className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className="h-px w-10 bg-red-500"
              />

              <span className="text-xs font-bold uppercase tracking-[0.25em] text-red-400">
                MangaVerse / Error
              </span>
            </div>

            <h1 className="mt-6 text-[clamp(7rem,20vw,15rem)] font-black leading-[0.8] tracking-[-0.08em] text-white">
              404
            </h1>

            <h2 className="mt-8 max-w-xl text-3xl font-black uppercase tracking-tight text-white sm:text-4xl">
              This chapter
              <span className="text-red-500">
                {' '}
                doesn't exist.
              </span>
            </h2>

            <p className="mt-5 max-w-xl text-sm leading-7 text-slate-500 sm:text-base sm:leading-8">
              The page you are looking for may have
              been moved, deleted or simply never
              existed in this story.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/"
                className="border border-red-500 bg-red-500 px-6 py-3.5 text-xs font-black uppercase tracking-wider text-white transition hover:bg-red-400"
              >
                Return to Discover
              </Link>

              <Link
                to="/about"
                className="border border-slate-700 px-6 py-3.5 text-xs font-black uppercase tracking-wider text-slate-400 transition hover:border-slate-500 hover:text-white"
              >
                About MangaVerse
              </Link>
            </div>
          </div>

          {/* Manga panel */}
          <div
            aria-hidden="true"
            className="relative hidden w-72 rotate-3 lg:block"
          >
            <div className="border border-slate-700 bg-slate-900 p-3 shadow-2xl shadow-black/50">
              <div className="relative aspect-[3/4] overflow-hidden border border-slate-800 bg-black">
                <div className="absolute inset-0 opacity-30 [background-image:radial-gradient(circle,white_1px,transparent_1px)] [background-size:10px_10px]" />

                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-[8rem] font-black leading-none text-slate-800">
                    ?
                  </span>
                </div>

                <div className="absolute bottom-0 left-0 right-0 border-t border-slate-800 bg-black/80 p-5">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-red-500">
                    Missing Panel
                  </p>

                  <p className="mt-2 text-xl font-black uppercase text-white">
                    Chapter 404
                  </p>
                </div>
              </div>

              <div className="flex justify-between px-2 py-2">
                <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-slate-600">
                  MangaVerse
                </span>

                <span className="text-[8px] text-slate-600">
                  ??? / ???
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default NotFound