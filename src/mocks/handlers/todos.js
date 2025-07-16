import { http, HttpResponse } from 'msw';
import { response_1 } from '../JsonResponse/todos/get/positive';

export const handlers = [
    http.get('https://jsonplaceholder.typicode.com/todos', () => HttpResponse.json(response_1))
]