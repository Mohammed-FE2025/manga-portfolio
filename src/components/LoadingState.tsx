function LoadingState() {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading manga"
      className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 xl:gap-6"
    >
      {Array.from({ length: 8 }).map(
        (_, index) => (
          <div
            key={index}
            className="overflow-hidden border border-slate-800 bg-slate-900"
          >
            <div className="aspect-[2/3] animate-pulse bg-slate-800" />

            <div className="space-y-4 p-5">
              <div className="h-3 w-24 animate-pulse bg-slate-800" />

              <div className="h-6 w-3/4 animate-pulse bg-slate-800" />

              <div className="h-3 w-1/2 animate-pulse bg-slate-800" />

              <div className="h-8 w-full animate-pulse bg-slate-800" />
            </div>
          </div>
        ),
      )}

      <span className="sr-only">
        Loading manga results...
      </span>
    </div>
  )
}

export default LoadingState