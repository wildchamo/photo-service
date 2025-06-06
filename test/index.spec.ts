import { env, createExecutionContext, waitOnExecutionContext, SELF } from 'cloudflare:test';
import { describe, it, expect } from 'vitest';
import worker from '../src/index';
import { ALL_IMAGES } from '../src/data/image_store';

// For now, you'll need to do something like this to get a correctly-typed
// `Request` to pass to `worker.fetch()`.
const IncomingRequest = Request<unknown, IncomingRequestCfProperties>;

describe('Photo Service', () => {
	describe('GET /images', () => {
		it('returns a 404 for a non-existent endpoint is called', async () => {
			const response = await SELF.fetch('https://example.com/invalid-endpoint');
			expect(response.status).toBe(404);
		});

		it('returns a 200 for a valid endpoint is called', async () => {
			const response = await SELF.fetch('https://example.com/images');
			expect(response.status).toEqual(200);
		});

		it('returns images for a valid endpoint is called', async () => {
			const response = await SELF.fetch('https://example.com/images');

			const json = await response.json();

			expect(json).toEqual(expect.arrayContaining(ALL_IMAGES));
		});

		it('returns one image with count=1', async () => {
			const response = await SELF.fetch('https://example.com/images?count=1');
			const images = (await response.json()) as unknown[];
			expect(images).toHaveLength(1);
		});
	});

	// it('responds with Hello World! (integration style)', async () => {
	// 	const response = await SELF.fetch('https://example.com');
	// 	expect(await response.text()).toMatchInlineSnapshot(`"Hello World!"`);
	// });
});
