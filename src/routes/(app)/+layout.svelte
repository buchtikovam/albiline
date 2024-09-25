<script lang="ts">
	import './../../app.pcss';
	import { Toaster } from '$lib/components/ui/sonner';
	import Sidebar from '$lib/components/sidebar/Sidebar.svelte';
	import Ribbon from '$lib/components/ribbon/Ribbon.svelte';
	import Header from '$lib/components/header/Header.svelte';
	import MainDialog from '$lib/components/dialog/ribbon-dialogs/MainDialog.svelte';
	import { isMobileStore, isMobileLayoutExpandedStore } from '$lib/stores/pageStore';

    let innerWidth: number;

    $: if (innerWidth < 768) {
		isMobileStore.set(true)
	} else {
		isMobileStore.set(false)
	}

	let isMobile: boolean = false;
	isMobileStore.subscribe((data) => isMobile = data)

	let isMobileLayoutExpanded: boolean;
	isMobileLayoutExpandedStore.subscribe((data) => isMobileLayoutExpanded = data)
</script>


<svelte:window bind:innerWidth/>


<Toaster
	position={isMobile ? "top-center" : "bottom-right"}
	class="h-52 overflow-visible md:flex md:justify-end"
/>

<div class="h-dvh w-dvh bg-albi-50">
	
	<div class="flex h-dvh flex-col">
		<header>
			<Header />
		</header>

		<div class="flex flex-row flex-1 pb-4">
			<div class="hidden md:block pl-4">
				<Sidebar />
			</div>
			<main class="flex flex-1 flex-col rounded-l-md">
				<Ribbon />
				
				<div class={(isMobileLayoutExpanded ? "px-4" : "px-4") + " flex flex-col flex-1 rounded-lg md:p-2 md:pr-4 md:pb-0"}>
					<slot />
				</div>
			</main>
		</div>
	</div>
</div>

<MainDialog/>
