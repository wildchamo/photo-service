import { ALL_IMAGES } from '../data/image_store';

import { IRequest } from 'itty-router';
import { Env } from '../env';

export async function getImages(request: IRequest, env: Env) {
	const db = env.DB;

	const limit = request.query.count ? request.query.count[0] : 10;

	let results;

	try {
		results = await db.prepare('SELECT i.*, c.display_name AS category_display_name FROM images i INNER JOIN images_categories c ON i.category_id = c.id ORDER BY i.created_at DESC LIMIT ?1').bind(limit).all();

	} catch (error) {

		let message

		if (error instanceof Error) {
			message = error.message;
		} else {
			message = 'An unknown error occurred';
		}

		console.error(message);

		return new Response(JSON.stringify({ error: message }), { status: 500 });

	}

	if (!results.success) {
		return new Response(('Failed to fetch images'), { status: 500 });
	}


	return new Response(JSON.stringify(results.results), {
		status: 200,
		headers: {
			'Content-Type': 'application/json',
		},
	});
}


export async function getImage(request: IRequest) {

	console.log(request);

	const id = request.params.id;

	const image = ALL_IMAGES.find((image) => image.id === parseInt(id));
	if (!image) {
		return new Response('Image not found', { status: 404 });
	}
	return new Response(JSON.stringify(image), {
		status: 200,
		headers: {
			'Content-Type': 'application/json',
		},
	});
}