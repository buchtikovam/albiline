<!--https://github.com/vite-pwa/sveltekit/blob/main/examples/sveltekit-ts-assets-generator/src/lib/ReloadPrompt.svelte-->

<script lang="ts">
	import { useRegisterSW } from 'virtual:pwa-register/svelte';
	import {agGridTables} from "$lib/runes/table.svelte";
	// import {goto} from "$app/navigation";
	// import {redirect} from "@sveltejs/kit";
	import {clearCache} from "$lib/cacheManager";

	const autoreload = true;
	// console.log('PWAReloadPrompt');

	const {
		offlineReady,
		needRefresh,
		updateServiceWorker
	} = useRegisterSW({
		onRegistered(r) {
			if (autoreload) {
				r && setInterval(() => {
					// console.log('Checking for sw update')
					r.update()
				}, 4000 /* 4s for testing purposes */)
			} else {
				console.log(`SW Registered: ${r}`)
			}
		},
		onRegisterError(error) {
			console.log('SW registration error', error)
		},
	})
	const close = () => {
		offlineReady.set(false)
		needRefresh.set(false)
	}

	let toast = $derived($needRefresh)
</script>

{#if toast}
	<div class="pwa-toast" role="alert">
		<div class="message">
			<span>
				Albiline byl aktualizován. Doporučujeme přenačíst aplikaci.
			</span>
		</div>
		{#if $needRefresh}
			<button onclick={async () => {
				await updateServiceWorker(true);
				agGridTables.value = {};
				await clearCache();
			}}>
				Přenačíst
			</button>
		{/if}
		<button onclick={close}>
			Zavřít
		</button>
	</div>
{/if}

<style>
	.pwa-toast {
		position: fixed;
		right: 0;
		bottom: 0;
		margin: 16px;
		padding: 12px;
		border: 1px solid #8885;
		border-radius: 4px;
		z-index: 2;
		text-align: left;
		box-shadow: 3px 4px 5px 0 #8885;
		background-color: white;
	}
	.pwa-toast .message {
		margin-bottom: 8px;
	}
	.pwa-toast button {
		border: 1px solid #8885;
		outline: none;
		margin-right: 5px;
		border-radius: 2px;
		padding: 3px 10px;
	}
</style>
