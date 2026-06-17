import { error } from '@sveltejs/kit';
import type { PageServerLoad } from '../$types';

export const load: PageServerLoad = async ({ fetch, params }) => {
    try {
        const id: string = params.id;

        const res = await fetch(`http://localhost:3000/products/${id}`)
        const data = await res.json()

        return { product: data.data }
    } catch {
        error(404, 'Not found');
    }
}

