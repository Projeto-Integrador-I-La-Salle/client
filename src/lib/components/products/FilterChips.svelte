<script lang="ts">
	import type { Filter } from '$lib/data/products';

	let { filters = [] }: { filters?: Filter[] } = $props();
</script>

<section class="flex flex-wrap gap-1.5 px-1">
	{#each filters as filter}
		<button
			class={`cursor-pointer rounded px-3 py-1 text-[10px] font-semibold ${
				filter.active ? 'bg-blue-700 text-white' : 'bg-slate-200 text-slate-600'
			}`}
		>
			{filter.label}
		</button>
	{/each}
</section>
