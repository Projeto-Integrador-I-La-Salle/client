<script lang="ts">
	type Props = {
		open?: boolean;
		orderId?: string;
		deliveryEstimate?: string;
		onTrackOrder?: () => void;
		onBackToHome?: () => void;
	};

	let {
		open = false,
		orderId = '1234',
		deliveryEstimate = 'Hoje, até as 18h',
		onTrackOrder,
		onBackToHome
	}: Props = $props();

	$effect(() => {
		if (open) launchConfetti();
	});

	function launchConfetti() {
		const colors = ['#004aad', '#33a0fd', '#d9e2ff'];

		for (let i = 0; i < 30; i++) {
			const el = document.createElement('div');
			const size = Math.random() * 8 + 4;

			Object.assign(el.style, {
				position: 'fixed',
				width: size + 'px',
				height: size + 'px',
				backgroundColor: colors[Math.floor(Math.random() * colors.length)],
				borderRadius: Math.random() > 0.5 ? '50%' : '2px',
				zIndex: '60',
				pointerEvents: 'none',
				left: Math.random() * 100 + 'vw',
				top: '-10px'
			});

			document.body.appendChild(el);

			const duration = Math.random() * 2000 + 1000;
			const delay = Math.random() * 500;

			el.animate(
				[
					{ transform: 'translate3d(0,0,0) rotate(0deg)', opacity: 1 },
					{
						transform: `translate3d(${Math.random() * 100 - 50}px, ${window.innerHeight + 20}px, 0) rotate(${Math.random() * 360}deg)`,
						opacity: 0
					}
				],
				{ duration, delay, easing: 'cubic-bezier(.37,0,.63,1)', fill: 'forwards' }
			);

			setTimeout(() => el.remove(), duration + delay);
		}
	}
</script>

{#if open}
	<!-- Overlay -->
	<div class="overlay" aria-hidden="true"></div>

	<!-- Modal -->
	<div class="modal-card" role="dialog" aria-modal="true" aria-labelledby="order-success-title">
		<!-- Decorative Header -->
		<div class="modal-header-bg">
			<div class="dots-pattern" aria-hidden="true"></div>
			<div class="check-circle">
				<svg
					class="check-svg"
					fill="none"
					stroke="currentColor"
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="3"
					viewBox="0 0 24 24"
					aria-hidden="true"
				>
					<path class="check-path" d="M5 13l4 4L19 7" />
				</svg>
			</div>
		</div>

		<!-- Content -->
		<div class="modal-body">
			<div class="text-block">
				<h1 id="order-success-title" class="modal-title">
					Pedido Realizado<br />com Sucesso!
				</h1>
				<p class="modal-subtitle">
					Seu pedido <span class="order-id">#{orderId}</span> foi recebido e já está sendo processado
					pela nossa equipe.
				</p>
			</div>

			<div class="delivery-box">
				<div class="delivery-icon-wrap">
					<span class="material-symbols-outlined delivery-icon">local_shipping</span>
				</div>
				<div>
					<p class="delivery-label">Previsão de Entrega</p>
					<p class="delivery-value">{deliveryEstimate}</p>
				</div>
			</div>

			<div class="actions">
				<button class="btn-primary" onclick={onTrackOrder}>
					Acompanhar Pedido
					<span class="material-symbols-outlined btn-arrow">arrow_forward</span>
				</button>
				<button class="btn-ghost" onclick={onBackToHome}> Voltar para o Início </button>
			</div>
		</div>
	</div>
{/if}

<style>
	.overlay {
		position: fixed;
		inset: 0;
		background-color: rgba(26, 28, 30, 0.4);
		backdrop-filter: blur(4px);
		-webkit-backdrop-filter: blur(4px);
		z-index: 40;
	}

	.modal-card {
		position: fixed;
		z-index: 50;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: calc(100% - 2rem);
		max-width: 400px;
		background-color: #f9f9fc;
		border-radius: 24px;
		box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
		overflow: hidden;
		animation: scaleIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
	}

	.modal-header-bg {
		height: 8rem;
		background-color: #004aad;
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: visible;
	}

	.dots-pattern {
		position: absolute;
		inset: 0;
		opacity: 0.2;
		background-image: radial-gradient(circle at 2px 2px, white 1px, transparent 0);
		background-size: 16px 16px;
	}

	.check-circle {
		width: 5rem;
		height: 5rem;
		background-color: #f9f9fc;
		border-radius: 9999px;
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
		position: relative;
		z-index: 10;
		transform: translateY(50%);
	}

	.check-svg {
		width: 2.5rem;
		height: 2.5rem;
		color: #004aad;
	}

	.check-path {
		stroke-dasharray: 50;
		stroke-dashoffset: 50;
		animation: checkmark 0.6s cubic-bezier(0.65, 0, 0.45, 1) 0.2s forwards;
	}

	.modal-body {
		padding: 4rem 1.5rem 1.5rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		text-align: center;
	}

	.text-block {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.modal-title {
		font-family: 'Plus Jakarta Sans', sans-serif;
		font-size: 24px;
		line-height: 32px;
		font-weight: 700;
		color: #1a1c1e;
	}

	.modal-subtitle {
		font-family: 'Inter', sans-serif;
		font-size: 14px;
		line-height: 20px;
		font-weight: 400;
		color: #434653;
	}

	.order-id {
		font-size: 14px;
		line-height: 20px;
		letter-spacing: 0.01em;
		font-weight: 600;
		color: #00357f;
	}

	.delivery-box {
		background-color: #f3f3f6;
		border-radius: 0.75rem;
		padding: 1rem;
		margin-top: 0.25rem;
		border: 1px solid rgba(195, 198, 213, 0.3);
		display: flex;
		align-items: center;
		gap: 0.75rem;
		text-align: left;
	}

	.delivery-icon-wrap {
		width: 2.5rem;
		height: 2.5rem;
		border-radius: 9999px;
		background-color: #d9e2ff;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}

	.delivery-icon {
		color: #004aad;
		font-size: 20px;
		font-variation-settings: 'FILL' 1;
	}

	.delivery-label {
		font-family: 'Inter', sans-serif;
		font-size: 12px;
		line-height: 16px;
		font-weight: 600;
		color: #434653;
		text-transform: uppercase;
		letter-spacing: 0.08em;
	}

	.delivery-value {
		font-family: 'Plus Jakarta Sans', sans-serif;
		font-size: 20px;
		line-height: 28px;
		font-weight: 600;
		color: #1a1c1e;
	}

	.actions {
		margin-top: 0.5rem;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		width: 100%;
	}

	.btn-primary {
		width: 100%;
		background-color: #00357f;
		color: #fff;
		font-family: 'Inter', sans-serif;
		font-size: 14px;
		line-height: 20px;
		letter-spacing: 0.01em;
		font-weight: 600;
		padding: 0.75rem 1rem;
		border-radius: 9999px;
		border: none;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		transition: background-color 0.15s;
	}
	.btn-primary:hover {
		background-color: #215abd;
	}

	.btn-arrow {
		font-size: 18px;
		font-variation-settings: 'FILL' 1;
	}

	.btn-ghost {
		width: 100%;
		background-color: transparent;
		color: #00357f;
		font-family: 'Inter', sans-serif;
		font-size: 14px;
		line-height: 20px;
		letter-spacing: 0.01em;
		font-weight: 600;
		padding: 0.75rem 1rem;
		border-radius: 9999px;
		border: none;
		cursor: pointer;
		transition: background-color 0.15s;
	}
	.btn-ghost:hover {
		background-color: #f3f3f6;
	}

	@keyframes scaleIn {
		from {
			transform: translate(-50%, -50%) scale(0.9);
			opacity: 0;
		}
		to {
			transform: translate(-50%, -50%) scale(1);
			opacity: 1;
		}
	}

	@keyframes checkmark {
		from {
			stroke-dashoffset: 50;
		}
		to {
			stroke-dashoffset: 0;
		}
	}
</style>
