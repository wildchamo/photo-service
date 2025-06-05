import { ALL_IMAGES } from '../data/image_store';

import { IRequest } from 'itty-router';

export async function getImages(request: IRequest) {
	let images = ALL_IMAGES;
	if (request.query.count) {
		images = images.slice(0, parseInt(request.query.count[0]));
	}
	return new Response(JSON.stringify(images), {
		status: 200,
		headers: {
			'Content-Type': 'application/json',
		},
	});
}
