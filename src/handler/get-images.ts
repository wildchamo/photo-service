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