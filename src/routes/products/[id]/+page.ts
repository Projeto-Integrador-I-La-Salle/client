import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
    try {
        const id = params.id;

        const res = await fetch(`http://localhost:3000/products/${id}`)
        const data = await res.json()

        return { product: data.data }
    } catch {
        error(404, 'Not found');
    }
};

