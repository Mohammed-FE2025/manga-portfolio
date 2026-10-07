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

  const activeFilterCount =
    Number(Boolean(status)) +
    Number(Boolean(genreId))

  return (
    <div>
      <Hero />

      <main className="relative mx-auto max-w-7xl px-6 pb-20">
        {/* Search + filters */}
        <section
          aria-label="Search and filter manga"
       className="relative mx-auto mt-10 max-w-6xl px-0"
        >
          <div className="border-y border-slate-800 bg-[#08090d]/95 backdrop-blur-xl">
            <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
              {/* Search */}
              <div className="border-b border-slate-800 p-6 lg:border-b-0 lg:border-r lg:p-8">
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-600">
                  Search the archive
                </p>

                <div className="mt-4">
                  <SearchBar
                    search={search}
                    onSearchChange={setSearch}
                    onSubmit={() =>
                      submitSearch(search)
                    }
                  />
                </div>
              </div>

              {/* Filters */}
              <div className="p-6 lg:p-8">
                <div className="mb-4 flex items-center justify-between">
                  <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-600">
                    Refine
                  </p>

                  {activeFilterCount > 0 && (
                    <span className="text-[10px] font-bold uppercase tracking-wider text-red-400">
                      {activeFilterCount} active
                    </span>
                  )}
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
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
          </div>
        </section>

        {/* Collection */}
        <section
          id="collection"
          className="mt-24 scroll-mt-24"
        >
          <div className="mb-10 border-b border-slate-800 pb-8">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-red-400">
                  The collection
                </p>

                <h2 className="mt-4 max-w-3xl text-4xl font-black uppercase leading-none tracking-[-0.04em] text-white sm:text-6xl">
                  Stories worth
                  <span className="block text-slate-500">
                    getting lost in.
                  </span>
                </h2>
              </div>

              {!loading &&
                !error &&
                manga.length > 0 && (
                  <div className="sm:text-right">
                    <p className="text-3xl font-black text-white">
                      {manga.length}
                    </p>

                    <p
                      className="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-600"
                      aria-live="polite"
                    >
                      Results / Page {page}
                    </p>
                  </div>
                )}
            </div>
          </div>

          {loading && <LoadingState />}

          {error && (
            <ErrorMessage message={error} />
          )}

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