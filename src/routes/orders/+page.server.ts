import type { PageLoad } from '../cart/$types';

export const load: PageLoad = async () => {
	try {
		const res = await fetch("http://localhost:3000/orders")

		const data = await res.json()

		return { orders: data.content }
	} catch {
		return { orders: [] }
	}
};

