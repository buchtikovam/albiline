<script lang="ts">
	import {Button} from '$lib/components/ui/button';
	import AutoFormSimple from '$lib/components/form/AutoFormSimple.svelte';
	import DialogWrapper from "$lib/components/dialog/DialogWrapper.svelte";
	import * as m from '$lib/paraglide/messages.js'
	import * as Dialog from '$lib/components/ui/dialog';

	interface Props {
		dialogOpen: boolean;
	}

	let {
		dialogOpen = $bindable(false),
	}: Props = $props();
</script>



<DialogWrapper
	bind:isOpen={dialogOpen}
	size="md"
	fixedHeight={true}
	{header}
	{content}
/>

{#snippet header()}
	<Dialog.Title>
		Nový zákazník
	</Dialog.Title>
{/snippet}

{#snippet content()}
	<div class="h-full">
		<!--		<AutoFormSimple-->
		<!--			bind:formValues={address}-->
		<!--			autoform={formDef}-->
		<!--		/>-->
	</div>

	<Dialog.Footer>
		<Button
			class="w-full bg-albi-500 text-background font-bolder"
		>
			{m.generics_save()}
		</Button>
	</Dialog.Footer>
{/snippet}

