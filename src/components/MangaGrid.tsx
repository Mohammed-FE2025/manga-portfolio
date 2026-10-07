import type { Manga } from '../types/manga'

import MangaCard from './MangaCard'

interface MangaGridProps {
  manga: Manga[]
}

function MangaGrid({
  manga,
}: MangaGridProps) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 xl:gap-6">
      {manga.map((item) => (
        <MangaCard
          key={item.id}
          manga={item}
        />
      ))}
    </div>
  )
}

export default MangaGrid