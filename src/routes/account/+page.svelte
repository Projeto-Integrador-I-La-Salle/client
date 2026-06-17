<script>
	// Estado reativo
	let cartItemCount = 2;
	let activeOrders = 2;

	const menuItems = {
		conta: [
			{
				icon: 'person_outline',
				label: 'Meus Dados',
				description: 'Informações pessoais e de contato',
				href: '#'
			},
			{
				icon: 'location_on',
				label: 'Endereços de Entrega',
				description: 'Gerencie onde receber suas compras',
				href: '#'
			},
			{
				icon: 'credit_card',
				label: 'Cartões Salvos',
				description: 'Métodos de pagamento seguros',
				href: '#'
			}
		],
		preferencias: [
			{
				icon: 'notifications',
				label: 'Notificações',
				description: 'Promoções e status de entrega',
				href: '#'
			},
			{
				icon: 'security',
				label: 'Segurança',
				description: 'Senha e autenticação 2FA',
				href: '#'
			}
		],
		suporte: [
			{
				icon: 'help_center',
				label: 'Central de Ajuda',
				description: 'Dúvidas frequentes e contato',
				href: '#'
			},
			{
				icon: 'description',
				label: 'Termos de Uso',
				description: 'Políticas de privacidade e termos',
				href: '#'
			}
		]
	};

	function handleLogout() {
		console.log('Logout');
	}
</script>

<svelte:head>
	<title>Farmacias Economica - Minha Conta</title>
	<link
		href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&family=Inter:wght@400;600&display=swap"
		rel="stylesheet"
	/>
	<link
		href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<!-- TopAppBar -->
<header>
	<div class="header-left">
		<button class="icon-btn desktop-only" aria-label="Menu">
			<span class="material-symbols-outlined">menu</span>
		</button>
		<h1 class="logo">Farmacias Economica</h1>
	</div>

	<div class="header-right">
		<button class="icon-btn cart-btn" aria-label="Carrinho de compras">
			<span class="material-symbols-outlined">shopping_cart</span>
			{#if cartItemCount > 0}
				<span class="cart-badge" aria-label="{cartItemCount} itens no carrinho">
					<span class="badge-ping"></span>
					<span class="badge-dot"></span>
				</span>
			{/if}
		</button>
	</div>
</header>

<!-- Main Content -->
<main>
	<!-- Profile Summary -->
	<section class="profile-card">
		<div class="avatar-wrapper">
			<div class="avatar">
				<img
					src="https://lh3.googleusercontent.com/aida-public/AB6AXuDogBeKh58jsiOePoIuy_m3oHr5RL323wZJwuITddos2IlXjciRHKsZpoW6ByPks7Oi-0Z0sNd5oLaXf09RvXlKCAzmMVA5cQJ__z12SnzTT4khckOYKjjzscGQD1iWIqflXl4tg_PnNWbgrKjSSUXSx8d_JPUI1_a5xp6VyjCzLb_ghwXMXTAev8uyinMNrv5RrQP9aQV-CIKWI1VmuPepDmAaCgx3nuzQLorojKAoUebWk2gaooxklLsUTWaj8Dw6myYh_2vnq1Q"
					alt="Foto de perfil de João Silva"
				/>
			</div>
			<button class="edit-avatar-btn" aria-label="Editar foto de perfil">
				<span class="material-symbols-outlined">edit</span>
			</button>
		</div>

		<h2 class="profile-name">João Silva</h2>
		<p class="profile-email">joao.silva@email.com.br</p>

		<div class="verified-badge">
			<span class="material-symbols-outlined">verified_user</span>
			Conta Verificada
		</div>
	</section>

	<!-- Navigation Grid -->
	<div class="nav-grid">
		<!-- Column 1 -->
		<div class="nav-col">
			<!-- Conta Section -->
			<section class="nav-section">
				<h3 class="section-title">Minha Conta</h3>
				<div class="card">
					{#each menuItems.conta as item}
						<a href={item.href} class="nav-item">
							<div class="nav-icon primary-icon">
								<span class="material-symbols-outlined">{item.icon}</span>
							</div>
							<div class="nav-text">
								<span class="nav-label">{item.label}</span>
								<span class="nav-desc">{item.description}</span>
							</div>
							<span class="material-symbols-outlined chevron">chevron_right</span>
						</a>
					{/each}
				</div>
			</section>

			<!-- Pedidos Section -->
			<section class="nav-section">
				<h3 class="section-title">Compras</h3>
				<div class="card">
					<a href="/orders" class="nav-item">
						<div class="nav-icon secondary-icon">
							<span class="material-symbols-outlined">receipt_long</span>
						</div>
						<div class="nav-text">
							<span class="nav-label">Meus Pedidos</span>
							<span class="nav-desc">Histórico e rastreamento</span>
						</div>
						{#if activeOrders > 0}
							<span class="orders-badge">{activeOrders} ativos</span>
						{/if}
						<span class="material-symbols-outlined chevron">chevron_right</span>
					</a>
				</div>
			</section>
		</div>

		<!-- Column 2 -->
		<div class="nav-col">
			<!-- Preferências Section -->
			<section class="nav-section">
				<h3 class="section-title">Preferências</h3>
				<div class="card">
					{#each menuItems.preferencias as item}
						<a href={item.href} class="nav-item">
							<div class="nav-icon tertiary-icon">
								<span class="material-symbols-outlined">{item.icon}</span>
							</div>
							<div class="nav-text">
								<span class="nav-label">{item.label}</span>
								<span class="nav-desc">{item.description}</span>
							</div>
							<span class="material-symbols-outlined chevron">chevron_right</span>
						</a>
					{/each}
				</div>
			</section>

			<!-- Suporte Section -->
			<section class="nav-section">
				<h3 class="section-title">Suporte</h3>
				<div class="card">
					{#each menuItems.suporte as item}
						<a href={item.href} class="nav-item">
							<div class="nav-icon neutral-icon">
								<span class="material-symbols-outlined">{item.icon}</span>
							</div>
							<div class="nav-text">
								<span class="nav-label">{item.label}</span>
								<span class="nav-desc">{item.description}</span>
							</div>
							<span class="material-symbols-outlined chevron">chevron_right</span>
						</a>
					{/each}
				</div>
			</section>
		</div>
	</div>

	<!-- Logout -->
	<div class="logout-wrapper">
		<button class="logout-btn" on:click={handleLogout}>
			<span class="material-symbols-outlined">logout</span>
			Sair da Conta
		</button>
	</div>
</main>

<!-- Bottom Nav (Mobile) -->
<nav class="bottom-nav" aria-label="Navegação principal">
	<a href="/products" class="nav-tab">
		<span class="material-symbols-outlined">home</span>
		<span>Inicio</span>
	</a>
	<a href="/browse" class="nav-tab">
		<span class="material-symbols-outlined">search</span>
		<span>Busca</span>
	</a>
	<a href="/cart" class="nav-tab cart-tab">
		<span class="material-symbols-outlined">shopping_cart</span>
		<span>Carrinho</span>
		{#if cartItemCount > 0}
			<span class="tab-badge" aria-hidden="true"></span>
		{/if}
	</a>
	<a href="/conta" class="nav-tab active">
		<span class="material-symbols-outlined icon-fill">person</span>
		<span>Conta</span>
	</a>
</nav>

<style>
	/* ─── Tokens ─────────────────────────────────────────────── */
	:global(:root) {
		--primary: #00357f;
		--primary-container: #004aad;
		--primary-fixed: #d9e2ff;
		--primary-fixed-dim: #b0c6ff;
		--on-primary: #ffffff;
		--secondary: #0061a4;
		--secondary-fixed: #d1e4ff;
		--secondary-container: #33a0fd;
		--on-secondary-container: #00355c;
		--tertiary: #34393d;
		--tertiary-fixed: #dfe3e8;
		--tertiary-container: #4b5054;
		--on-tertiary: #ffffff;
		--error: #ba1a1a;
		--on-error: #ffffff;
		--error-container: #ffdad6;
		--on-error-container: #93000a;
		--surface: #f9f9fc;
		--surface-bright: #f9f9fc;
		--surface-container: #eeeef0;
		--surface-container-low: #f3f3f6;
		--on-surface: #1a1c1e;
		--on-surface-variant: #434653;
		--outline: #737784;
		--outline-variant: #c3c6d5;
		--font-display: 'Plus Jakarta Sans', sans-serif;
		--font-body: 'Inter', sans-serif;
	}

	/* ─── Global resets ──────────────────────────────────────── */
	:global(*, *::before, *::after) {
		box-sizing: border-box;
		margin: 0;
		padding: 0;
		-webkit-tap-highlight-color: transparent;
	}

	:global(body) {
		background: var(--surface);
		color: var(--on-surface);
		font-family: var(--font-body);
		font-size: 14px;
		line-height: 20px;
		min-height: 100dvh;
		padding-bottom: 80px;
		padding-top: 64px;
		-webkit-font-smoothing: antialiased;
	}

	:global(a) {
		text-decoration: none;
		color: inherit;
	}

	.material-symbols-outlined {
		font-family: 'Material Symbols Outlined';
		font-size: 24px;
		line-height: 1;
		user-select: none;
	}

	.icon-fill {
		font-variation-settings: 'FILL' 1;
	}

	/* ─── Header ─────────────────────────────────────────────── */
	header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		height: 64px;
		padding: 0 16px;
		background: var(--surface);
		border-bottom: 1px solid var(--outline-variant);
		z-index: 50;
	}

	.header-left,
	.header-right {
		display: flex;
		align-items: center;
		gap: 16px;
	}

	.logo {
		font-family: var(--font-display);
		font-size: 20px;
		font-weight: 700;
		color: var(--primary);
	}

	.icon-btn {
		background: none;
		border: none;
		cursor: pointer;
		padding: 8px;
		border-radius: 50%;
		color: var(--on-surface-variant);
		display: flex;
		align-items: center;
		justify-content: center;
		transition: background 0.2s;
	}

	.icon-btn:hover {
		background: var(--surface-container-low);
	}

	.desktop-only {
		display: none;
	}

	@media (min-width: 768px) {
		.desktop-only {
			display: flex;
		}
	}

	/* Cart badge */
	.cart-btn {
		position: relative;
	}

	.cart-badge {
		position: absolute;
		top: 4px;
		right: 4px;
		width: 12px;
		height: 12px;
	}

	.badge-ping {
		position: absolute;
		inset: 0;
		border-radius: 50%;
		background: var(--error);
		opacity: 0.75;
		animation: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite;
	}

	.badge-dot {
		position: relative;
		display: block;
		width: 12px;
		height: 12px;
		border-radius: 50%;
		background: var(--error);
		border: 1.5px solid var(--surface);
	}

	@keyframes ping {
		75%,
		100% {
			transform: scale(2);
			opacity: 0;
		}
	}

	/* ─── Main ───────────────────────────────────────────────── */
	main {
		max-width: 768px;
		margin: 0 auto;
		padding: 24px 16px;
	}

	@media (min-width: 768px) {
		main {
			padding: 24px 48px;
		}
	}

	/* ─── Profile Card ───────────────────────────────────────── */
	.profile-card {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 32px 24px;
		background: var(--surface-bright);
		border-radius: 16px;
		border: 1px solid color-mix(in srgb, var(--outline-variant) 30%, transparent);
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
		margin-bottom: 24px;
	}

	.avatar-wrapper {
		position: relative;
		margin-bottom: 16px;
	}

	.avatar {
		width: 96px;
		height: 96px;
		border-radius: 50%;
		background: var(--primary-fixed);
		border: 4px solid var(--surface);
		overflow: hidden;
		box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
	}

	.avatar img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
	}

	.edit-avatar-btn {
		position: absolute;
		bottom: 0;
		right: 0;
		background: var(--primary);
		color: var(--on-primary);
		border: none;
		border-radius: 50%;
		width: 28px;
		height: 28px;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
		transition: background 0.2s;
	}

	.edit-avatar-btn .material-symbols-outlined {
		font-size: 16px;
	}

	.edit-avatar-btn:hover {
		background: var(--primary-container);
	}

	.profile-name {
		font-family: var(--font-display);
		font-size: 20px;
		font-weight: 700;
		color: var(--on-surface);
	}

	.profile-email {
		font-size: 14px;
		color: var(--on-surface-variant);
		margin-top: 4px;
	}

	.verified-badge {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		margin-top: 16px;
		padding: 4px 12px;
		border-radius: 9999px;
		background: color-mix(in srgb, var(--secondary-fixed) 50%, transparent);
		color: var(--secondary);
		font-size: 12px;
		font-weight: 600;
		line-height: 16px;
	}

	.verified-badge .material-symbols-outlined {
		font-size: 14px;
	}

	/* ─── Nav Grid ───────────────────────────────────────────── */
	.nav-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 24px;
	}

	@media (min-width: 768px) {
		.nav-grid {
			grid-template-columns: 1fr 1fr;
		}
	}

	.nav-col {
		display: flex;
		flex-direction: column;
		gap: 24px;
	}

	/* ─── Section ────────────────────────────────────────────── */
	.section-title {
		font-size: 12px;
		font-weight: 600;
		line-height: 16px;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--on-surface-variant);
		margin-bottom: 12px;
		padding: 0 8px;
	}

	/* ─── Card ───────────────────────────────────────────────── */
	.card {
		background: var(--surface-bright);
		border-radius: 16px;
		border: 1px solid color-mix(in srgb, var(--outline-variant) 30%, transparent);
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
		overflow: hidden;
	}

	.card > * + * {
		border-top: 1px solid color-mix(in srgb, var(--outline-variant) 30%, transparent);
	}

	/* ─── Nav Item ───────────────────────────────────────────── */
	.nav-item {
		display: flex;
		align-items: center;
		padding: 16px;
		transition: background 0.15s;
		cursor: pointer;
	}

	.nav-item:hover {
		background: var(--surface-container-low);
	}

	.nav-item:hover .nav-icon {
		transform: scale(1.05);
	}

	.nav-icon {
		padding: 8px;
		border-radius: 8px;
		margin-right: 16px;
		flex-shrink: 0;
		transition: transform 0.15s;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.primary-icon {
		background: color-mix(in srgb, var(--primary-fixed) 50%, transparent);
		color: var(--primary);
	}

	.secondary-icon {
		background: color-mix(in srgb, var(--secondary-fixed) 50%, transparent);
		color: var(--secondary);
	}

	.tertiary-icon {
		background: color-mix(in srgb, var(--tertiary-fixed) 50%, transparent);
		color: var(--tertiary);
	}

	.neutral-icon {
		background: var(--surface-container);
		color: var(--on-surface-variant);
	}

	.nav-text {
		flex: 1;
		min-width: 0;
	}

	.nav-label {
		display: block;
		font-size: 16px;
		font-weight: 500;
		line-height: 24px;
		color: var(--on-surface);
	}

	.nav-desc {
		display: block;
		font-size: 12px;
		line-height: 16px;
		color: var(--on-surface-variant);
	}

	.chevron {
		color: var(--outline);
		flex-shrink: 0;
	}

	/* Orders badge */
	.orders-badge {
		background: var(--error);
		color: var(--on-error);
		font-size: 12px;
		font-weight: 600;
		padding: 2px 8px;
		border-radius: 9999px;
		margin-right: 8px;
		flex-shrink: 0;
	}

	/* ─── Logout ─────────────────────────────────────────────── */
	.logout-wrapper {
		display: flex;
		justify-content: center;
		margin-top: 32px;
		margin-bottom: 32px;
	}

	.logout-btn {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		padding: 12px 32px;
		border-radius: 9999px;
		border: 2px solid var(--error);
		color: var(--error);
		background: none;
		font-family: var(--font-body);
		font-size: 14px;
		font-weight: 600;
		cursor: pointer;
		transition:
			background 0.2s,
			color 0.2s;
		width: 100%;
		justify-content: center;
	}

	@media (min-width: 768px) {
		.logout-btn {
			width: auto;
		}
	}

	.logout-btn:hover {
		background: color-mix(in srgb, var(--error-container) 50%, transparent);
		color: var(--on-error-container);
	}

	/* ─── Bottom Nav ─────────────────────────────────────────── */
	.bottom-nav {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		display: flex;
		justify-content: space-around;
		align-items: center;
		padding: 8px 0;
		background: var(--surface);
		border-top: 1px solid var(--outline-variant);
		z-index: 50;
	}

	@media (min-width: 768px) {
		.bottom-nav {
			display: none;
		}
	}

	.nav-tab {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		flex: 1;
		padding: 4px;
		border-radius: 8px;
		color: var(--on-surface-variant);
		font-size: 10px;
		font-weight: 600;
		line-height: 16px;
		gap: 2px;
		transition: background 0.15s;
		position: relative;
	}

	.nav-tab:hover {
		background: var(--surface-container-low);
	}

	.nav-tab.active {
		color: var(--primary);
		font-weight: 700;
	}

	/* Tab badge */
	.cart-tab {
		position: relative;
	}

	.tab-badge {
		position: absolute;
		top: 4px;
		right: calc(25% - 4px);
		width: 8px;
		height: 8px;
		background: var(--error);
		border-radius: 50%;
		border: 1.5px solid var(--surface);
	}
</style>
