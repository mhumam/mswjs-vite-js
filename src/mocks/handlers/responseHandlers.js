import { http, HttpResponse, delay, bypass } from 'msw';

export const handlers = [
    http.get('https://dummyjson.com/error-response', ({ request }) => {
        const url = new URL(request.url);
        const errorCode = url.searchParams.get('errorCode');

        if (errorCode) {
            return new HttpResponse(null, { status: errorCode })
        }

        return HttpResponse.json({ data: 'success' });
    }),
    http.get('https://dummyjson.com/network-errors', () => HttpResponse.error()),
    http.post('https://dummyjson.com/login-cookies', () => {
        const cookies = 'authToken=abc-123'
        return new HttpResponse(cookies, {
            headers: {
                'set-cookie': cookies,
            },
        })
    }),
    http.get('https://dummyjson.com/weather/:city', function* () {
        let degree = 25

        while (degree < 30) {
            degree++
            yield HttpResponse.json({ degree })
        }

        // Respons terakhir setelah looping selesai
        return HttpResponse.json({ degree })
    }),
    http.get('https://dummyjson.com/response-timing', async () => {
        await delay(5000)
        return HttpResponse.json({ id: 'abc-123' })
    }),
    http.get('https://dummyjson.com/posts/1', async ({ request }) => {
        // Get the original JSON response from the server.
        const originalData = await fetch(bypass(request)).then((response) => response.json())

        return HttpResponse.json({
            // Combine the original data with the mocked data.
            ...originalData,
            mockId: 'mocked-id',
        })
    })
]