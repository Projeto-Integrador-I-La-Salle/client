<script lang="ts">
	let { label, value, change }: { label: string; value: string | number; change?: number } = $props();
</script>

<div class="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
	<p class="text-sm font-medium text-slate-500 uppercase tracking-wide">{label}</p>
	<div class="mt-2 flex items-end justify-between">
		<p class="text-3xl font-bold text-slate-900">{value}</p>
		{#if change !== undefined}
			<div
				class={`text-sm font-semibold ${
					change >= 0 ? 'text-green-600' : 'text-red-600'
				}`}
			>
				{change >= 0 ? '+' : ''}{change}%
			</div>
		{/if}
	</div>
</div>
