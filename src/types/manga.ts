export interface Manga {
  id: string
  type: 'manga'

  attributes: {
    title: Record<string, string>

    description: Record<string, string> | null

    status: string

    year: number | null

    contentRating: string

    lastChapter: string | null

    lastVolume: string | null

    tags: {
      id: string
      type: 'tag'
      attributes: {
        name: Record<string, string>
        group: string
      }
    }[]
  }

  relationships: MangaRelationship[]
}

export interface MangaRelationship {
  id: string
  type: string

  attributes?: {
    fileName?: string
    name?: string
  }
}