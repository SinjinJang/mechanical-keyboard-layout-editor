/**
 * Zod schemas for runtime validation
 */

import { z } from 'zod';

export const KeyDefinitionSchema = z.object({
  label: z.string().optional(),
  x: z.number(),
  y: z.number(),
  w: z.number().positive().default(1),
  h: z.number().positive().default(1),
  a: z.number().default(0),
});

export const LayoutJsonSchema = z.object({
  width: z.number().positive(),
  height: z.number().positive(),
  layout: z.array(KeyDefinitionSchema).min(1),
});

export type KeyDefinition = z.infer<typeof KeyDefinitionSchema>;
export type LayoutJson = z.infer<typeof LayoutJsonSchema>;

/**
 * Validate and parse layout JSON with defaults applied
 */
export function parseLayoutJson(input: unknown): LayoutJson {
  return LayoutJsonSchema.parse(input);
}

/**
 * Safely validate layout JSON, returns null on failure
 */
export function safeParseLayoutJson(input: unknown): LayoutJson | null {
  const result = LayoutJsonSchema.safeParse(input);
  return result.success ? result.data : null;
}
