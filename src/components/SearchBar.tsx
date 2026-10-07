interface SearchBarProps {
  search: string
  onSearchChange: (value: string) => void
  onSubmit: () => void
}

function SearchBar({
  search,
  onSearchChange,
  onSubmit,
}: SearchBarProps) {
  function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault()
    onSubmit()
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="relative"
    >
      <label
        htmlFor="manga-search"
        className="sr-only"
      >
        Search manga
      </label>

      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-lg text-slate-500"
          >
            ⌕
          </span>

          <input
            id="manga-search"
            type="search"
            value={search}
            onChange={(event) =>
              onSearchChange(
                event.target.value,
              )
            }
            placeholder="Search by manga title..."
            className="
              w-full
              border
              border-slate-700
              bg-slate-950
              px-12
              py-4
              text-sm
              text-white
              placeholder:text-slate-600
              outline-none
              transition
              focus:border-red-500
              focus:ring-2
              focus:ring-red-500/10
            "
          />

          {search && (
            <button
              type="button"
              onClick={() =>
                onSearchChange('')
              }
              aria-label="Clear search"
              className="
                absolute
                right-3
                top-1/2
                -translate-y-1/2
                px-2
                py-1
                text-sm
                text-slate-500
                transition
                hover:text-white
              "
            >
              ✕
            </button>
          )}
        </div>

        <button
          type="submit"
          className="
            border
            border-red-500
            bg-red-500
            px-7
            py-4
            text-sm
            font-black
            uppercase
            tracking-wider
            text-white
            transition
            hover:bg-red-400
            focus:outline-none
            focus:ring-2
            focus:ring-red-500
            focus:ring-offset-2
            focus:ring-offset-slate-950
            sm:w-auto
          "
        >
          Search
        </button>
      </div>

      <div className="mt-3 flex items-center justify-between">
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-600">
          MangaDex catalog
        </p>

        <p className="hidden text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-600 sm:block">
          Enter ↵
        </p>
      </div>
    </form>
  )
}

export default SearchBar