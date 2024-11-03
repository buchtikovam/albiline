<script lang="ts">
	import type { AutoFormSimpleType } from "$lib/types/components/form/autoform/autoform";
	import AutoFormSimple from '$lib/components/form/AutoFormSimple.svelte';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Button } from '$lib/components/ui/button';

	export let dialogOpen: boolean = false;
	export let label: string = "Nový kontakt";
	export let formDef: AutoFormSimpleType;
	export let translationRoute: string;

	console.log(formDef);
</script>



<Dialog.Root
	bind:open={dialogOpen}
	closeOnOutsideClick={false}
>
	<Dialog.Content class="">
		<Dialog.Header>
			<Dialog.Title class="h-6 mb-2">
				{ label }
			</Dialog.Title>
		</Dialog.Header>

		<div class="mb-4">
			<AutoFormSimple translationRoute={translationRoute} autoform={formDef}/>
		</div>

		<Dialog.Footer>
			<Button
				class="w-full bg-albi-500 text-background font-bolder"
				on:click={() => dialogOpen = false}
			>
				Uložit
			</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
