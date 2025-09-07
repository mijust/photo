// ./src/sanity/schemaTypes/index.ts
import type { SchemaTypeDefinition } from "sanity";
import { photoType } from './photo';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [photoType],
};