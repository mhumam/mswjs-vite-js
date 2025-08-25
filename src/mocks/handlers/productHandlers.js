// import { http, HttpResponse, bypass } from 'msw';
import { http, HttpResponse } from 'msw';
import response from './data/product-success.json';

export const handlers = [
    http.get('https://dummyjson.com/products', () => HttpResponse.json(response))
    // http.get('https://dummyjson.com/products', () => new HttpResponse(null, { status: 404 }))
    // http.get('https://dummyjson.com/products', () => HttpResponse.json({}, { status: 404 }))
    // http.get('https://dummyjson.com/products', () => HttpResponse.error())
    /*http.get('https://dummyjson.com/products', () => HttpResponse.json(response, {
        headers: {
            // Setting the "Set-Cookie" header on the mocked response
            // will set the cookies on the `document` as if they were
            // received from the server.
            'set-cookie': 'authToken=abc-123',
        },
    }))*/
    // http.get('https://dummyjson.com/products', () => HttpResponse.json(response, {
    //     status: 301,
    //     headers: {
    //         location: '/resource-b',
    //     }
    // }))

    // http.get('https://dummyjson.com/products', function* () {
    //     let status = 'pending';

    //     // Simulasi polling status
    //     yield HttpResponse.json({ status });
    //     status = 'processing';
    //     yield HttpResponse.json({ status });
    //     status = 'completed';
    //     return HttpResponse.json({ status });
    // })

    // http.get('https://dummyjson.com/products', async ({ request }) => {
    //     // Get the original JSON response from the server.
    //     const originalData = await fetch(bypass(request)).then((response) => response.json())

    //     return HttpResponse.json({
    //         // Combine the original data with the mocked data.
    //         ...originalData,
    //         id: 'mocked-id',
    //     })
    // })
]