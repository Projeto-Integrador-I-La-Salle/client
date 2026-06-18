import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
	const body = await request.json();

	const res = await fetch('http://localhost:3000/orders', {
		method: 'POST',
		body: JSON.stringify(body),
		headers: { 'Content-Type': 'application/json' }
	});

	if (!res.ok) {
		return json({ error: 'Falha ao criar pedido' }, { status: res.status });
	}

	const data = await res.json().catch(() => null);
	return json(data, { status: 201 });
};

