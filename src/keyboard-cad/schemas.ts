/**
 * Zod schemas for runtime validation
 */

import { z } from 'zod';

export const KeyDefinitionSchema = z.object({
  label: z.string().optional(),
  x: z.number(),
  y: z.number(),
  w: z.number().default(1),
  h: z.number().default(1),
  a: z.number().default(0),
});

export const LayoutJsonSchema = z.object({
  width: z.number(),
  height: z.number(),
  layout: z.array(KeyDefinitionSchema),
});

export type KeyDefinitionParsed = z.infer<typeof KeyDefinitionSchema>;
export type LayoutJsonParsed = z.infer<typeof LayoutJsonSchema>;
