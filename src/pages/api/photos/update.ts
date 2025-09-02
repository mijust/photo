import type { APIRoute } from 'astro';
import { client } from '../../../sanity/lib/client';

export const POST: APIRoute = async ({ request }) => {
  if (request.headers.get("Content-Type") !== "application/json") {
    return new Response(JSON.stringify({ message: "Invalid content type, expected application/json" }), { status: 400 });
  }

  try {
    const { id, title } = await request.json();

    if (!id || !title) {
      return new Response(JSON.stringify({ message: "Photo ID ('id') and title are required" }), { status: 400 });
    }

    // You can extend this to update more fields by passing them in the request body
    const updatedPhoto = await client
      .patch(id)
      .set({ title })
      .commit();

    return new Response(JSON.stringify(updatedPhoto), { status: 200 });
  } catch (error) {
    console.error("Error updating photo:", error);
    return new Response(JSON.stringify({ message: "An unexpected error occurred while updating the photo." }), { status: 500 });
  }
};
