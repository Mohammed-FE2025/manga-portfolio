import MangaGrid from './components/MangaGrid'
import LoadingState from './components/LoadingState'
import ErrorMessage from './components/ErrorMessage'
import SearchBar from './components/SearchBar'
import EmptyState from './components/EmptyState'
import Pagination from './components/Pagination'
import FilterBar from './components/FilterBar'
import GenreFilter from './components/GenreFilter'
import Hero from './components/Hero'

import useManga from './hooks/useManga'

function App() {
  const {
    manga,
    loading,
    error,

    search,
    setSearch,
    submitSearch,

    status,
    changeStatus,

    orderBy,
    changeOrder,

    genres,
    genreId,
    changeGenre,

    page,
    totalPages,
    goToPage,
  } = useManga()

  return (
    <div>
      {/* Hero */}

      <Hero />

      {/* Main content */}

<main className="relative mx-auto max-w-7xl px-6 pb-12">
        {/* Search and filters */}

      <section
  aria-label="Search and filter manga"
  className="relative -mt-10 z-10"
>
          <div className="border border-slate-800 bg-slate-950/95 p-4 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-6">

            {/* Search */}

            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-500">
                Search
              </p>

              <SearchBar
                search={search}
                onSearchChange={setSearch}
                onSubmit={() =>
                  submitSearch(search)
                }
              />
            </div>

            {/* Filters */}

            <div className="mt-6 border-t border-slate-800 pt-6">
              <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-500">
                Filters
              </p>

              <div className="grid gap-4 lg:grid-cols-3">
                <FilterBar
                  status={status}
                  orderBy={orderBy}
                  onStatusChange={changeStatus}
                  onOrderChange={changeOrder}
                />

                <GenreFilter
                  genres={genres}
                  genreId={genreId}
                  onGenreChange={changeGenre}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Results */}

        <section className="mt-14">
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="flex items-center gap-3">
  <span
    aria-hidden="true"
    className="h-px w-8 bg-red-500"
  />

  <p className="text-xs font-bold uppercase tracking-[0.25em] text-red-400">
    Chapter 01 / Explore
  </p>
</div>

<h2 className="mt-3 text-3xl font-black uppercase tracking-tight sm:text-4xl">
  Manga Collection
</h2>

<p className="mt-3 max-w-xl text-sm leading-6 text-slate-500">
  Search the catalog, narrow down your results and
  discover something new.
</p>
            </div>

            {!loading && !error && manga.length > 0 && (
              <p
                className="text-sm text-slate-500"
                aria-live="polite"
              >
                Showing {manga.length} results
              </p>
            )}
          </div>

          {/* Loading */}

          {loading && <LoadingState />}

          {/* Error */}

          {error && (
            <ErrorMessage message={error} />
          )}

          {/* Results */}

          {!loading &&
            !error &&
            manga.length > 0 && (
              <>
                <MangaGrid manga={manga} />

                <Pagination
                  currentPage={page}
                  totalPages={totalPages}
                  onPageChange={goToPage}
                />
              </>
            )}

          {/* Empty */}

          {!loading &&
            !error &&
            manga.length === 0 && (
              <EmptyState />
            )}
        </section>
      </main>
    </div>
  )
}

export default App