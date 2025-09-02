import type { APIRoute } from 'astro';
import { client } from '../../../sanity/lib/client';

export const POST: APIRoute = async ({ request }) => {
  // We are expecting a JSON body with the ID of the photo to delete.
  if (request.headers.get("Content-Type") !== "application/json") {
    return new Response(JSON.stringify({ message: "Invalid content type, expected application/json" }), { status: 400 });
  }

  try {
    const { id } = await request.json();

    if (!id) {
      return new Response(JSON.stringify({ message: "Photo ID ('id') is required in the request body" }), { status: 400 });
    }

    // The token is now read from `import.meta.env.SANITY_WRITE_TOKEN` on the server, which is secure.
    await client.delete(id);

    return new Response(JSON.stringify({ message: "Photo deleted successfully" }), { status: 200 });
  } catch (error) {
    console.error("Error deleting photo:", error);
    return new Response(JSON.stringify({ message: "An unexpected error occurred while deleting the photo." }), { status: 500 });
  }
};
