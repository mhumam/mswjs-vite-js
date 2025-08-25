import { http, HttpResponse } from 'msw';
import response from './data/product-success.json';

export const handlers = [
    http.get('https://dummyjson.com/products', () => HttpResponse.json(response))
]