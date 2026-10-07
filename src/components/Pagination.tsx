interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) {
    return null
  }

  const pages: number[] = []

  const startPage = Math.max(
    1,
    currentPage - 2,
  )

  const endPage = Math.min(
    totalPages,
    currentPage + 2,
  )

  for (
    let page = startPage;
    page <= endPage;
    page += 1
  ) {
    pages.push(page)
  }

  return (
    <nav
      aria-label="Manga pages"
      className="mt-12 flex flex-wrap items-center justify-center gap-2"
    >
      <button
        type="button"
        onClick={() =>
          onPageChange(currentPage - 1)
        }
        disabled={currentPage === 1}
        aria-label="Go to previous page"
        className="
          border
          border-slate-800
          bg-slate-950
          px-4
          py-2.5
          text-xs
          font-bold
          uppercase
          tracking-wider
          text-slate-400
          transition
          hover:border-slate-600
          hover:text-white
          disabled:cursor-not-allowed
          disabled:opacity-30
        "
      >
        ← Prev
      </button>

      {startPage > 1 && (
        <>
          <button
            type="button"
            onClick={() =>
              onPageChange(1)
            }
            aria-label="Go to page 1"
            className="
              border
              border-slate-800
              bg-slate-950
              px-4
              py-2.5
              text-xs
              font-bold
              text-slate-400
              transition
              hover:border-slate-600
              hover:text-white
            "
          >
            1
          </button>

          {startPage > 2 && (
            <span
              aria-hidden="true"
              className="px-1 text-slate-600"
            >
              …
            </span>
          )}
        </>
      )}

      {pages.map((page) => {
        const isCurrent =
          page === currentPage

        return (
          <button
            key={page}
            type="button"
            onClick={() =>
              onPageChange(page)
            }
            aria-label={`Go to page ${page}`}
            aria-current={
              isCurrent
                ? 'page'
                : undefined
            }
            className={`
              border
              px-4
              py-2.5
              text-xs
              font-bold
              transition
              ${
                isCurrent
                  ? 'border-red-500 bg-red-500 text-white'
                  : 'border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-600 hover:text-white'
              }
            `}
          >
            {page}
          </button>
        )
      })}

      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && (
            <span
              aria-hidden="true"
              className="px-1 text-slate-600"
            >
              …
            </span>
          )}

          <button
            type="button"
            onClick={() =>
              onPageChange(totalPages)
            }
            aria-label={`Go to page ${totalPages}`}
            className="
              border
              border-slate-800
              bg-slate-950
              px-4
              py-2.5
              text-xs
              font-bold
              text-slate-400
              transition
              hover:border-slate-600
              hover:text-white
            "
          >
            {totalPages}
          </button>
        </>
      )}

      <button
        type="button"
        onClick={() =>
          onPageChange(currentPage + 1)
        }
        disabled={currentPage === totalPages}
        aria-label="Go to next page"
        className="
          border
          border-slate-800
          bg-slate-950
          px-4
          py-2.5
          text-xs
          font-bold
          uppercase
          tracking-wider
          text-slate-400
          transition
          hover:border-slate-600
          hover:text-white
          disabled:cursor-not-allowed
          disabled:opacity-30
        "
      >
        Next →
      </button>
    </nav>
  )
}

export default Pagination