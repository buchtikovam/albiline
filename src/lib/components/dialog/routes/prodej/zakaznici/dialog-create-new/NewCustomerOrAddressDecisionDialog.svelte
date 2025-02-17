<script lang="ts">
	import {ribbonAction} from "$lib/runes/ribbon.svelte";
	import {Button} from "$lib/components/ui/button/index.js";
	import {RibbonActionEnum} from "$lib/enums/ribbon/ribbonAction";
	import MapPinHouse from "lucide-svelte/icons/map-pin-house";
	import UserPlus from "lucide-svelte/icons/user-plus";
	import DialogWrapper from "$lib/components/dialog/DialogWrapper.svelte";
	import * as Dialog from "$lib/components/ui/dialog/index.js";

	let isOpen = $state(false);

	$effect(() => {
		console.log(ribbonAction.value)

		if (ribbonAction.value === RibbonActionEnum.NEW) {
			isOpen = true;
			ribbonAction.value = RibbonActionEnum.UNKNOWN;
		}
	})
</script>




<DialogWrapper
	bind:isOpen={isOpen}
	{header}
	{content}
	size="sm"
	fixedHeight={false}
/>

{#snippet header()}
	<Dialog.Title>
		Co si přeješ vytvořit?
	</Dialog.Title>
{/snippet}

{#snippet content()}
	<div class="flex flex-col gap-4 mt-2  w-[320px]">
		<Button>
			<UserPlus strokeWidth={2.5}/>
			Nový zákazník
		</Button>

		<Button>
			<MapPinHouse strokeWidth={2.5}/>
			Nová prodejna
		</Button>
	</div>
{/snippet}


