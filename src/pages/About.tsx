import { Link } from 'react-router'

function About() {
  return (
    <main className="relative overflow-hidden">
      {/* Background decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute left-[-10%] top-20 h-400 w-400 rounded-full bg-red-600/10 blur-3xl" />

        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle,rgba(255,255,255,0.2)_1px,transparent_1px)]" />
      </div>

      {/* Header */}
      <section className="border-b border-slate-800">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:py-20 lg:py-24">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className="h-px w-10 bg-red-500"
              />

              <p className="text-xs font-bold uppercase tracking-[0.25em] text-red-400">
                About / MangaVerse
              </p>
            </div>

            <h1 className="mt-6 text-5xl font-black uppercase leading-[0.95] tracking-[-0.04em] text-white sm:text-6xl lg:text-7xl">
              Built for
              <span className="block text-red-500">
                discovering stories.
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">
              MangaVerse is a front-end portfolio
              project focused on creating a modern,
              editorial-style manga discovery
              experience.
            </p>
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="mx-auto max-w-7xl px-6 py-14 sm:py-20">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Project story */}
          <article className="border border-slate-800 bg-slate-900/70 p-7 sm:p-10">
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-red-400">
                Chapter 01
              </p>

              <span className="text-xs font-bold text-slate-700">
                001
              </span>
            </div>

            <h2 className="mt-8 text-2xl font-black uppercase tracking-tight text-white sm:text-3xl">
              The project
            </h2>

            <div className="mt-6 space-y-5 text-sm leading-7 text-slate-400 sm:text-base sm:leading-8">
              <p>
                MangaVerse was created as a portfolio
                project to practice building a complete
                React application around a real-world API.
              </p>

              <p>
                The application combines manga search,
                filtering, sorting, pagination and
                detailed manga pages into one responsive
                interface.
              </p>

              <p>
                The visual direction is inspired by manga
                magazines, editorial layouts and modern
                Japanese graphic design rather than a
                traditional anime fan-site aesthetic.
              </p>
            </div>

            <div className="mt-8 border-t border-slate-800 pt-6">
              <Link
                to="/"
                className="inline-flex items-center gap-3 text-xs font-black uppercase tracking-wider text-slate-400 transition hover:text-white"
              >
                Explore the collection

                <span
                  aria-hidden="true"
                  className="text-red-500"
                >
                  →
                </span>
              </Link>
            </div>
          </article>

          {/* Technologies */}
          <article className="border border-slate-800 bg-slate-950 p-7 sm:p-10">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-red-400">
              Chapter 02
            </p>

            <h2 className="mt-4 text-2xl font-black uppercase tracking-tight text-white sm:text-3xl">
              Technologies
            </h2>

            <div className="mt-8 grid grid-cols-2 gap-px border border-slate-800 bg-slate-800">
              {[
                'React',
                'TypeScript',
                'Vite',
                'Tailwind CSS',
                'React Router',
                'MangaDex API',
              ].map((technology) => (
                <div
                  key={technology}
                  className="bg-slate-950 p-5 transition hover:bg-slate-900"
                >
                  <p className="text-sm font-bold text-slate-200">
                    {technology}
                  </p>

                  <p className="mt-2 text-[10px] font-semibold uppercase tracking-wider text-slate-600">
                    Core technology
                  </p>
                </div>
              ))}
            </div>
          </article>
        </div>

        {/* Features */}
        <section className="mt-8 border border-slate-800 bg-slate-900/70">
          <div className="border-b border-slate-800 px-7 py-6 sm:px-10">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-red-400">
                  Chapter 03
                </p>

                <h2 className="mt-2 text-2xl font-black uppercase tracking-tight text-white sm:text-3xl">
                  Features
                </h2>
              </div>

              <p className="text-xs uppercase tracking-wider text-slate-600">
                What MangaVerse can do
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                number: '01',
                title: 'Search',
                text: 'Find manga by title through the MangaDex catalog.',
              },
              {
                number: '02',
                title: 'Filter',
                text: 'Narrow results by status and genre.',
              },
              {
                number: '03',
                title: 'Sort',
                text: 'Organize the collection by popularity, title, year or updates.',
              },
              {
                number: '04',
                title: 'Pagination',
                text: 'Move through large result sets without loading everything at once.',
              },
              {
                number: '05',
                title: 'Details',
                text: 'Explore individual manga with cover, credits, synopsis and metadata.',
              },
              {
                number: '06',
                title: 'Responsive',
                text: 'The interface adapts across desktop, tablet and mobile screens.',
              },
            ].map((feature) => (
              <article
                key={feature.number}
                className="border-b border-slate-800 p-7 transition hover:bg-slate-950 sm:border-r sm:p-8 lg:p-10"
              >
                <span className="text-xs font-black text-red-500">
                  {feature.number}
                </span>

                <h3 className="mt-4 text-lg font-black uppercase text-white">
                  {feature.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-500">
                  {feature.text}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* API attribution */}
        <section className="mt-8 overflow-hidden border border-slate-800 bg-slate-950">
          <div className="grid lg:grid-cols-[1fr_auto]">
            <div className="p-7 sm:p-10">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-red-400">
                Data source
              </p>

              <h2 className="mt-3 text-2xl font-black uppercase tracking-tight text-white">
                MangaDex API
              </h2>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-500">
                Manga information and cover artwork
                displayed throughout MangaVerse are
                provided through the MangaDex API.
              </p>
            </div>

            <div className="border-t border-slate-800 p-7 lg:border-l lg:border-t-0 sm:p-10">
              <a
                href="https://mangadex.org"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 border border-red-500 bg-red-500 px-6 py-3.5 text-xs font-black uppercase tracking-wider text-white transition hover:bg-red-400"
              >
                Visit MangaDex
                <span aria-hidden="true">
                  ↗
                </span>
              </a>
            </div>
          </div>
        </section>
      </section>
    </main>
  )
}

export default About