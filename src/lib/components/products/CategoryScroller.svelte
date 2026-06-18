<script lang="ts">
	import type { Category } from '$lib/data/products';

	let { categories = [] }: { categories?: Category[] } = $props();
</script>

<section class="space-y-2">
	<div class="flex items-center justify-between px-1">
		<h3 class="text-sm font-bold">Categorias</h3>
		<button type="button" class="cursor-pointer text-[10px] font-semibold text-blue-700"
			>Visualizar todos</button
		>
	</div>

	<div class="no-scrollbar flex gap-3 overflow-x-auto px-1 pb-1">
		{#each categories as category}
			<div class="flex shrink-0 flex-col items-center gap-1.5">
				<button
					type="button"
					aria-pressed={category.active ? 'true' : 'false'}
					class="group flex h-12 w-12 cursor-pointer items-center justify-center rounded-xl bg-slate-200 text-blue-700 transition-colors hover:bg-blue-700"
					aria-label={`Open ${category.name} category`}
				>
					<span class="material-symbols-outlined text-lg group-hover:text-white"
						>{category.icon}</span
					>
				</button>
				<span class="text-[10px] font-medium text-slate-600">{category.name}</span>
			</div>
		{/each}
	</div>
</section>
