import type { APIRoute } from 'astro';
import { client } from '../../../sanity/lib/client';
import type { SanityDocument } from '@sanity/client';

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData();
    const title = formData.get('title') as string;
    const imageFile = formData.get('image') as File;

    if (!title || !imageFile) {
      return new Response(JSON.stringify({ message: "Title and image file are required" }), { status: 400 });
    }

    // 1. Upload the image asset from the file stream
    const imageAsset = await client.assets.upload('image', imageFile, {
      filename: imageFile.name,
      contentType: imageFile.type,
    });

    // 2. Create the photo document with a reference to the new asset
    const doc: Partial<SanityDocument> = {
      _type: 'photo',
      title,
      slug: { _type: 'slug', current: title.toLowerCase().replace(/\s+/g, '-').slice(0, 96) },
      image: {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: imageAsset._id,
        },
      },
      featured: false,
      dateTaken: new Date().toISOString(),
    };

    const newPhoto = await client.create(doc);

    return new Response(JSON.stringify(newPhoto), { status: 201 });
  } catch (error) {
    console.error("Error creating photo:", error);
    return new Response(JSON.stringify({ message: "An unexpected error occurred while creating the photo." }), { status: 500 });
  }
};
