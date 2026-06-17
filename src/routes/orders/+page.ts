import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
	try {
		const res = await fetch("http://localhost:3000/orders")

		const data = await res.json()

		return { orders: data.content }
	} catch {
		error(404, 'Not found');
	}
};

