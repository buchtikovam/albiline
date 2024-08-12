<script lang="ts">
	import { Toaster } from '$lib/components/ui/sonner';
	import './../../app.pcss';
	import Sidebar from '$lib/components/sidebar/Sidebar.svelte';
	import Ribbon from '$lib/components/ribbon/Ribbon.svelte';
	import Header from '$lib/components/header/Header.svelte';
	import MainDialog from '$lib/components/dialog/ribbon-dialogs/MainDialog.svelte';
</script>



<div class="wrapper h-dvh w-dvh font-plus-jakarta-sans">
	<Toaster
		position="bottom-right"
		class="flex justify-end h-56"
	/>

	<div class="flex h-dvh flex-col">
		<header class="flex flex-col border-b lg:h-fit">
			<div class="pl-2 border-b">
				<Header />
			</div>
			<Ribbon />
		</header>

		<div class="flex flex-row flex-1">
			<div class="hidden lg:block">
				<Sidebar />
			</div>
			<main class="flex flex-1 flex-col rounded-l-md bg-muted">
				<div class="flex flex-1 flex-col rounded-md p-4 pr-0">
					<slot />
				</div>
			</main>
		</div>
	</div>
</div>

<MainDialog/>