const MANGADEX_CDN =
  'https://uploads.mangadex.org/covers'

const allowedSizes = [
  '256',
  '512',
] as const

export async function GET(
  request: Request,
) {
  try {
    const url = new URL(request.url)

    const mangaId =
      url.searchParams.get('mangaId')

    const fileName =
      url.searchParams.get('fileName')

    const size =
      url.searchParams.get('size') ?? '256'

    if (!mangaId || !fileName) {
      return Response.json(
        {
          error:
            'Missing mangaId or fileName.',
        },
        { status: 400 },
      )
    }

    if (
      !allowedSizes.includes(
        size as (typeof allowedSizes)[number],
      )
    ) {
      return Response.json(
        {
          error:
            'Invalid image size.',
        },
        { status: 400 },
      )
    }

    if (
      mangaId.includes('/') ||
      mangaId.includes('\\') ||
      fileName.includes('/') ||
      fileName.includes('\\')
    ) {
      return Response.json(
        {
          error: 'Invalid image path.',
        },
        { status: 400 },
      )
    }

    const imageUrl =
      `${MANGADEX_CDN}/` +
      `${encodeURIComponent(mangaId)}/` +
      `${encodeURIComponent(fileName)}.` +
      `${size}.jpg`

    const response =
      await fetch(imageUrl, {
        signal: request.signal,
      })

    if (!response.ok) {
      return new Response(
        'Unable to load MangaDex image.',
        {
          status: response.status,
        },
      )
    }

    return new Response(
      response.body,
      {
        status: 200,
        headers: {
          'Content-Type':
            response.headers.get(
              'Content-Type',
            ) ?? 'image/jpeg',

          'Cache-Control':
            'public, s-maxage=86400, stale-while-revalidate=604800',
        },
      },
    )
  } catch (error) {
    console.error(
      'MangaDex image proxy error:',
      error,
    )

    return Response.json(
      {
        error:
          'Unable to load MangaDex image.',
      },
      { status: 502 },
    )
  }
}