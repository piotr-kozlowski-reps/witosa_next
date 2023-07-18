import { z } from 'zod';

export const loginEmailSchema = z.string().email();
export const loginPasswordSchema = z.string().min(5).max(20);
