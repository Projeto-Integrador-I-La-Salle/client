<script lang="ts">
	import { productImageUrl, type Product } from '$lib/data/products';

	type Props = {
		open?: boolean;
		product?: Product;
		onViewCart?: () => void;
		onContinueShopping?: () => void;
		onClose?: () => void;
	};

	let { open = false, product, onViewCart, onContinueShopping, onClose }: Props = $props();

	function fmt(value?: number) {
		if (value) return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
	}

	function handleOverlayClick(e: MouseEvent) {
		if (e.target === e.currentTarget) onClose?.();
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') onClose?.();
	}
</script>

{#if open}
	<div
		tabindex="-1"
		class="overlay"
		role="dialog"
		aria-modal="true"
		aria-labelledby="modal-title"
		onclick={handleOverlayClick}
		onkeydown={handleKeydown}
	>
		<div class="modal-card">
			<!-- Success Icon -->
			<div class="success-icon-wrap">
				<div class="success-icon-bg">
					<span
						class="material-symbols-outlined success-icon"
						style="font-variation-settings: 'FILL' 1;"
					>
						check_circle
					</span>
				</div>
			</div>

			<!-- Header -->
			<div class="modal-header">
				<h2 id="modal-title" class="modal-title">Produto Adicionado!</h2>
				<p class="modal-subtitle">Seu item foi adicionado ao carrinho com sucesso.</p>
			</div>

			<!-- Product Summary -->
			<div class="product-summary">
				<div class="product-thumb">
					<img src={productImageUrl(product?.images?.[0])} alt={product?.name} class="thumb-img" />
				</div>
				<div class="product-info">
					<h3 class="product-name">{product?.name}</h3>
					<p class="product-price">{fmt(product?.price)}</p>
				</div>
			</div>

			<!-- Actions -->
			<div class="modal-actions">
				<button class="btn-primary" onclick={onViewCart}>
					<span class="material-symbols-outlined btn-icon">shopping_cart</span>
					Ver Carrinho
				</button>
				<button class="btn-outline" onclick={onContinueShopping}> Continuar Comprando </button>
			</div>
		</div>
	</div>
{/if}

<style>
	/* ── Overlay ──────────────────────────────────────────── */
	.overlay {
		position: fixed;
		inset: 0;
		background-color: rgba(47, 49, 51, 0.4);
		backdrop-filter: blur(4px);
		-webkit-backdrop-filter: blur(4px);
		z-index: 50;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 1rem;
		animation: fadeIn 0.3s ease-out;
	}

	/* ── Modal Card ───────────────────────────────────────── */
	.modal-card {
		background-color: #f9f9fc;
		border-radius: 0.75rem;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
		width: 100%;
		max-width: 24rem;
		display: flex;
		flex-direction: column;
		padding: 1.5rem;
		border: 1px solid rgba(195, 198, 213, 0.3);
		animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1);
	}

	/* ── Success Icon ─────────────────────────────────────── */
	.success-icon-wrap {
		display: flex;
		justify-content: center;
		margin-bottom: 1rem;
	}

	.success-icon-bg {
		width: 4rem;
		height: 4rem;
		border-radius: 9999px;
		background-color: #e6f4ea;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.success-icon {
		color: #137333;
		font-size: 2.5rem;
	}

	/* ── Header ───────────────────────────────────────────── */
	.modal-header {
		text-align: center;
		margin-bottom: 1.5rem;
	}

	.modal-title {
		font-family: 'Plus Jakarta Sans', sans-serif;
		font-size: 24px;
		line-height: 32px;
		font-weight: 700;
		color: #1a1c1e;
		margin-bottom: 0.25rem;
	}

	.modal-subtitle {
		font-family: 'Inter', sans-serif;
		font-size: 14px;
		line-height: 20px;
		font-weight: 400;
		color: #434653;
	}

	/* ── Product Summary ──────────────────────────────────── */
	.product-summary {
		background-color: #f3f3f6;
		border-radius: 0.5rem;
		padding: 1rem;
		display: flex;
		align-items: center;
		gap: 1rem;
		margin-bottom: 2rem;
		border: 1px solid #e2e2e5;
	}

	.product-thumb {
		width: 4rem;
		height: 4rem;
		background-color: #fff;
		border-radius: 0.375rem;
		flex-shrink: 0;
		border: 1px solid rgba(195, 198, 213, 0.5);
		overflow: hidden;
	}

	.thumb-img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center;
	}

	.product-info {
		flex: 1;
		min-width: 0;
	}

	.product-name {
		font-family: 'Inter', sans-serif;
		font-size: 14px;
		line-height: 20px;
		letter-spacing: 0.01em;
		font-weight: 600;
		color: #1a1c1e;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.product-subtitle {
		font-family: 'Inter', sans-serif;
		font-size: 12px;
		line-height: 16px;
		font-weight: 400;
		color: #434653;
		margin-bottom: 0.25rem;
	}

	.product-price {
		font-family: 'Plus Jakarta Sans', sans-serif;
		font-size: 18px;
		line-height: 24px;
		font-weight: 700;
		color: #00357f;
	}

	/* ── Actions ──────────────────────────────────────────── */
	.modal-actions {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.btn-primary {
		width: 100%;
		background-color: #00357f;
		color: #fff;
		border-radius: 9999px;
		padding: 0.75rem 1rem;
		border: none;
		cursor: pointer;
		font-family: 'Inter', sans-serif;
		font-size: 14px;
		line-height: 20px;
		letter-spacing: 0.01em;
		font-weight: 600;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		transition: background-color 0.15s;
	}
	.btn-primary:hover {
		background-color: #004aad;
	}

	.btn-icon {
		font-size: 18px;
	}

	.btn-outline {
		width: 100%;
		background-color: transparent;
		border: 1px solid #00357f;
		color: #00357f;
		border-radius: 9999px;
		padding: 0.75rem 1rem;
		cursor: pointer;
		font-family: 'Inter', sans-serif;
		font-size: 14px;
		line-height: 20px;
		letter-spacing: 0.01em;
		font-weight: 600;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: background-color 0.15s;
	}
	.btn-outline:hover {
		background-color: #d9e2ff;
	}

	/* ── Animations ───────────────────────────────────────── */
	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	@keyframes slideUp {
		from {
			opacity: 0;
			transform: translateY(20px) scale(0.95);
		}
		to {
			opacity: 1;
			transform: translateY(0) scale(1);
		}
	}
</style>
