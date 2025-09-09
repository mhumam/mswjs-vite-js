import { handlers as productHandlers } from './productHandlers';
import { handlers as responseHandlers } from './responseHandlers';

export const handlers = [...productHandlers, ...responseHandlers];
