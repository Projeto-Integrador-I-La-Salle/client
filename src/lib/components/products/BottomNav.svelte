<script lang="ts">
	import { page } from '$app/stores';

	type NavItem = {
		label: string;
		icon: string;
		href: string;
		matchPaths: string[];
	};

	const navItems: NavItem[] = [
		{ label: 'Inicio', icon: 'home', href: '/products', matchPaths: ['/products'] },
		{ label: 'Busca', icon: 'grid_view', href: '/browse', matchPaths: ['/browse'] },
		{ label: 'Carrinho', icon: 'shopping_cart', href: '/cart', matchPaths: ['/cart'] },
		{ label: 'Analytics', icon: 'monitoring', href: '/analytics', matchPaths: ['/analytics'] },
		{ label: 'Conta', icon: 'person', href: '/account', matchPaths: ['/account'] }
	];

	const currentPath = $derived($page.url.pathname);

	const isItemActive = (item: NavItem) =>
		item.matchPaths.some((path) => currentPath === path || currentPath.startsWith(`${path}/`));
</script>

<nav class="fixed bottom-0 left-0 z-50 w-full border-t border-slate-200 bg-white px-1 pt-1">
	<div class="mx-auto flex max-w-7xl items-center justify-around pb-2">
		{#each navItems as item (item.label)}
			{@const isActive = isItemActive(item)}
			<a
				href={item.href}
				aria-current={isActive ? 'page' : undefined}
				class={`flex cursor-pointer flex-col items-center justify-center px-4 py-1.5 transition-colors hover:text-blue-700 ${isActive ? 'text-blue-700' : 'text-slate-400'}`}
			>
				<span
					class="material-symbols-outlined text-xl"
					style={`font-variation-settings: 'FILL' ${isActive ? 1 : 0};`}
				>
					{item.icon}
				</span>
				<span class="text-[9px] font-medium">{item.label}</span>
			</a>
		{/each}
	</div>
</nav>
