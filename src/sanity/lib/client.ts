import { createClient } from "@sanity/client";

export const client = createClient({
  projectId: 'jav1zi17',
  dataset: 'production',
  apiVersion: '2025-01-28',
  useCdn: false,
  token: import.meta.env.SANITY_WRITE_TOKEN, // A token with write permissions is required to create, update, or delete documents
});
