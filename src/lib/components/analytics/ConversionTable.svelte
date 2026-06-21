<script lang="ts">
	import type { conversionByProduct } from '$lib/stores/analytics';

	let { products }: { products: Awaited<ReturnType<typeof conversionByProduct>> } = $props();
</script>

<div class="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
	<h2 class="mb-4 text-lg font-bold text-slate-900">Conversão por Produto</h2>

	{#if products.length === 0}
		<p class="text-center text-slate-500">Sem dados disponíveis</p>
	{:else}
		<div class="overflow-x-auto">
			<table class="w-full text-sm">
				<thead>
					<tr class="border-b border-slate-200">
						<th class="px-4 py-2 text-left font-semibold text-slate-700">Produto</th>
						<th class="px-4 py-2 text-center font-semibold text-slate-700">Visualizações</th>
						<th class="px-4 py-2 text-center font-semibold text-slate-700">No Carrinho</th>
						<th class="px-4 py-2 text-center font-semibold text-slate-700">Taxa Carrinho</th>
						<th class="px-4 py-2 text-center font-semibold text-slate-700">Conversão</th>
					</tr>
				</thead>
				<tbody>
					{#each products.slice(0, 10) as product}
						<tr class="border-b border-slate-100 hover:bg-slate-50">
							<td class="px-4 py-3 font-medium text-slate-900">
								<span class="truncate">{product.name}</span>
							</td>
							<td class="px-4 py-3 text-center text-slate-600">{product.views}</td>
							<td class="px-4 py-3 text-center text-slate-600">{product.addedToCart}</td>
							<td class="px-4 py-3 text-center">
								<span class="inline-block rounded bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-700">
									{product.cartRate}%
								</span>
							</td>
							<td class="px-4 py-3 text-center">
								<span class="inline-block rounded bg-green-100 px-2 py-1 text-xs font-semibold text-green-700">
									{product.conversionRate}%
								</span>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{/if}
</div>
