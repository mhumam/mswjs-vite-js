import { http, HttpResponse } from 'msw'

export const handlers = [
    http.get('https://jsonplaceholder.typicode.com/todos', () => {
        // ...and respond to them using this JSON response.
        return HttpResponse.json([
            {
                "userId": 1,
                "id": 1,
                "title": "[mswjs mock] delectus aut autem",
                "completed": false
            },
            {
                "userId": 1,
                "id": 2,
                "title": "[mswjs mock] quis ut nam facilis et officia qui",
                "completed": false
            },
            {
                "userId": 1,
                "id": 3,
                "title": "[mswjs mock] fugiat veniam minus",
                "completed": false
            },
            {
                "userId": 1,
                "id": 4,
                "title": "[mswjs mock] et porro tempora",
                "completed": true
            },
            {
                "userId": 1,
                "id": 5,
                "title": "[mswjs mock] laboriosam mollitia et enim quasi adipisci quia provident illum",
                "completed": false
            }
        ])
    })
]