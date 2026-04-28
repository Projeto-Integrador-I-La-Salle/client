import { env } from '$env/dynamic/private';
import type { Product } from '$lib/data/products';

const defaultProductsUrl = 'http://localhost:3000/products';
const emptyProducts = { content: [] as Product[] };

const normalizeText = (value: string) => value.trim().toLowerCase();

export async function loadProducts(fetchFn: typeof fetch): Promise<{
	products: { content: Product[] };
	productsError: string;
}> {
	const url = normalizeText(env.PRODUCTS_API_URL || '') || defaultProductsUrl;

	try {
		const response = await fetchFn(url);

		if (!response.ok) {
			return {
				products: emptyProducts,
				productsError: `Local API returned ${response.status}`
			};
		}

		const parsed = await response.json();

		return { products: parsed, productsError: '' };
	} catch {
		return {
			products: emptyProducts,
			productsError: 'Nao foi possivel carregar produtos da API local.'
		};
	}
}
