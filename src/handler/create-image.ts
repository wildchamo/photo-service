import { IRequest } from 'itty-router';
import { Env } from '../env';

interface ImageRequest {
	category_id: number;
	user_id: number;
	image_url: string;
	title: string;
	format: string;
	resolution: string;
	file_size_bytes: number;
}

export async function createImage(request: IRequest, env: Env) {
	const db = env.DB;

	let result

	try {
		const imageRequest = await request.json() as ImageRequest;

		// Validate required fields
		if (!imageRequest.category_id || !imageRequest.user_id || !imageRequest.image_url ||
			!imageRequest.title || !imageRequest.format || !imageRequest.resolution ||
			!imageRequest.file_size_bytes) {
			return new Response('Invalid request: missing required fields', { status: 400 });
		}

		// Insert into database using prepared statement with parameters
		result = await db.prepare(`
			INSERT INTO images
			(category_id, user_id, image_url, title, format, resolution, file_size_bytes)
			VALUES
			(?1, ?2, ?3, ?4, ?5, ?6, ?7)
		`).bind(
			imageRequest.category_id,
			imageRequest.user_id,
			imageRequest.image_url,
			imageRequest.title,
			imageRequest.format,
			imageRequest.resolution,
			imageRequest.file_size_bytes
		).run();



	} catch (error) {
		let message = 'Internal server error';
		if (error instanceof Error) {
			message = error.message;
		}
		console.error('Error creating image:', message);
		return new Response(message, { status: 500 });
	}

	if (!result) {
		return new Response('Failed to create image', { status: 500 });
	}

	return new Response(JSON.stringify(result), { status: 201, headers: { 'Content-Type': 'application/json' } });

}
