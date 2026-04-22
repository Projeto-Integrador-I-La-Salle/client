import { env } from '$env/dynamic/private';
import { type Product } from '$lib/data/products';
import type { PageServerLoad } from './$types';

const defaultProductsUrl = 'http://localhost:3000/products';

export const load: PageServerLoad = async ({ fetch }) => {
	const url = env.PRODUCTS_API_URL ?? defaultProductsUrl;
	let products: { content: Product[] } = { content: [] };
	let productsError = '';

	try {
		const response = await fetch(url);

		if (!response.ok) {
			productsError = `Local API returned ${response.status}`;
		} else {
			products = (await response.json()) as { content: Product[] };
		}
	} catch {
		productsError = 'Nao foi possivel carregar produtos da API local.';
	}

	return { products, productsError };
};
