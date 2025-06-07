import { IRequest } from 'itty-router';
import { ALL_IMAGES } from '../data/image_store';

export async function createImage(request: IRequest) {

	const imageRequest = await request.json() as { url: string, author: string };

	if (!imageRequest.url || !imageRequest.author) {
		return new Response('Invalid request', { status: 400 });
	}

	const newImage = {
		id: ALL_IMAGES.length + 1,
		url: imageRequest.url,
		author: imageRequest.author,
	}

	ALL_IMAGES.unshift(newImage);

	return new Response(JSON.stringify(newImage), { status: 201, headers: { 'Content-Type': 'application/json' } });
}