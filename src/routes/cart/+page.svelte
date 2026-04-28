<script lang="ts">
	import BottomNav from '$lib/components/products/BottomNav.svelte';
	import TopBar from '$lib/components/products/TopBar.svelte';
</script>

<svelte:head>
	<title>Carrinho | Farmacias Economica</title>
</svelte:head>

<div class="min-h-dvh bg-slate-50 text-xs text-slate-900 antialiased">
	<TopBar cartCount={2} />

	<main class="mx-auto flex min-h-[70dvh] max-w-7xl items-center justify-center px-4 pb-16 pt-14">
		<section class="w-full max-w-md rounded-md border border-slate-200 bg-white p-6 text-center shadow-sm">
			<h2 class="text-base font-bold text-slate-900">Carrinho em construcao</h2>
			<p class="mt-2 text-sm text-slate-500">Em breve voce podera revisar e finalizar seus pedidos.</p>
		</section>
	</main>

	<BottomNav />
</div>
