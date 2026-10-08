const MANGADEX_URL =
  'https://api.mangadex.org'

const ALLOWED_PATHS = [
  'manga',
  'manga/tag',
]

export async function GET(
  request: Request,
) {
  try {
    const url = new URL(request.url)

    const path =
      url.searchParams.get('path')

    if (!path) {
      return Response.json(
        {
          error: 'Missing MangaDex path.',
        },
        { status: 400 },
      )
    }

    const cleanPath =
      path.replace(/^\/+/, '')

    const isAllowed =
      ALLOWED_PATHS.some(
        (allowedPath) =>
          cleanPath === allowedPath ||
          cleanPath.startsWith(
            `${allowedPath}/`,
          ),
      )

    if (!isAllowed) {
      return Response.json(
        {
          error:
            'This MangaDex endpoint is not allowed.',
        },
        { status: 403 },
      )
    }

    url.searchParams.delete('path')

    const queryString =
      url.searchParams.toString()

    const targetUrl =
      `${MANGADEX_URL}/${cleanPath}` +
      (queryString
        ? `?${queryString}`
        : '')

    const response =
      await fetch(targetUrl, {
        signal: request.signal,
        headers: {
          Accept: 'application/json',
        },
      })

    const body =
      await response.text()

    return new Response(body, {
      status: response.status,
      headers: {
        'Content-Type':
          response.headers.get(
            'Content-Type',
          ) ?? 'application/json',

        'Cache-Control':
          's-maxage=60, stale-while-revalidate=300',
      },
    })
  } catch (error) {
    console.error(
      'MangaDex proxy error:',
      error,
    )

    return Response.json(
      {
        error:
          'Unable to reach MangaDex.',
      },
      { status: 502 },
    )
  }
}