function EmptyState() {
  return (
    <div
      role="status"
      className="border border-slate-800 bg-slate-900/60 px-6 py-16 text-center"
    >
      <div
        aria-hidden="true"
        className="mx-auto flex h-14 w-14 items-center justify-center border border-slate-700 bg-slate-950 text-2xl font-black text-slate-600"
      >
        ?
      </div>

      <p className="mt-6 text-xs font-bold uppercase tracking-[0.25em] text-red-400">
        No results
      </p>

      <h2 className="mt-3 text-2xl font-black uppercase tracking-tight text-white">
        Nothing found in this chapter.
      </h2>

      <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-slate-500">
        We could not find any manga matching your
        current search and filters. Try another title
        or remove one of the filters.
      </p>
    </div>
  )
}

export default EmptyState