function Hero() {
  return (
    <section className="relative isolate overflow-hidden border-b border-slate-800">
      {/* Background decoration */}

      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
      >
        {/* Red glow */}

        <div className="absolute right-[-10%] top-[-20%] h-[500px] w-[500px] rounded-full bg-red-600/10 blur-3xl" />

        {/* Halftone pattern */}

        <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:18px_18px]" />

        {/* Dark gradient */}

        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/20 to-slate-950" />
      </div>

      <div className="mx-auto max-w-7xl px-6 py-20 sm:py-28 lg:py-32">
        <div className="grid items-center gap-14 lg:grid-cols-[1.2fr_0.8fr]">

          {/* Left side */}

          <div>
            {/* Editorial label */}

            <div className="mb-7 flex items-center gap-3">
              <span
                aria-hidden="true"
                className="h-px w-10 bg-red-500"
              />

              <span className="text-xs font-bold uppercase tracking-[0.25em] text-red-400">
                Manga / Discovery
              </span>
            </div>

            {/* Main heading */}

            <h1 className="max-w-4xl text-5xl font-black uppercase leading-[0.95] tracking-[-0.04em] text-white sm:text-6xl lg:text-7xl">
              Find your
              <span className="block text-red-500">
                next story.
              </span>
            </h1>

            {/* Description */}

            <p className="mt-7 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">
              Explore manga, discover new worlds and
              find stories worth getting lost in.
              Search the MangaDex catalog and find
              your next obsession.
            </p>

            {/* Metadata */}

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
              <span>Search</span>

              <span aria-hidden="true">/</span>

              <span>Filter</span>

              <span aria-hidden="true">/</span>

              <span>Discover</span>
            </div>
          </div>

          {/* Right side */}

          <div className="relative hidden lg:block">

            {/* Main panel */}

            <div className="relative mx-auto max-w-sm rotate-2 border border-slate-700 bg-slate-900 p-3 shadow-2xl shadow-black/50">

              <div className="aspect-[2/3] overflow-hidden bg-slate-800">
                <div className="flex h-full items-end bg-gradient-to-br from-red-950 via-slate-900 to-black p-8">

                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.25em] text-red-400">
                      Featured
                    </p>

                    <p className="mt-2 text-3xl font-black uppercase tracking-tight text-white">
                      Manga
                    </p>
                  </div>
                </div>
              </div>

              {/* Panel label */}

              <div className="flex items-center justify-between border-t border-slate-700 px-3 py-3">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                  MangaVerse / 001
                </span>

                <span className="text-xs text-red-500">
                  ●
                </span>
              </div>
            </div>

            {/* Decorative small panel */}

            <div
              aria-hidden="true"
              className="absolute -bottom-8 -left-8 w-32 rotate-[-8deg] border border-slate-700 bg-slate-950 p-4"
            >
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-600">
                Discover
              </p>

              <p className="mt-2 text-xl font-black text-white">
                001
              </p>
            </div>

            {/* Decorative red square */}

            <div
              aria-hidden="true"
              className="absolute -right-4 -top-4 h-16 w-16 border border-red-500/30 bg-red-500/10"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero