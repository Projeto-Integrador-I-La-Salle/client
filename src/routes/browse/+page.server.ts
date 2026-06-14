import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url, fetch }) => {
	try {
		const name = url.searchParams.get('name') ?? ''

		const params = new URLSearchParams()
		if (name) params.set('name', name)

		const res = await fetch(`http://localhost:3000/products?${params.toString()}`)
		const data = await res.json()

		return { products: data.content }
	} catch {
		return {
			products: emptyProducts,
			productsError: 'Nao foi possivel carregar produtos da API local.'
		};
	}
}
