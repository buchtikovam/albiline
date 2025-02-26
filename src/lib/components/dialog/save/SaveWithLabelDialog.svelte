<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Label } from '$lib/components/ui/label';
	import { Input } from '$lib/components/ui/input';
	import DialogWrapper from "$lib/components/dialog/DialogWrapper.svelte";
	import * as Dialog from '$lib/components/ui/dialog';

	interface Props {
		isOpen: boolean;
		inputValue: string;
		saveButtonLabel: () => string;
		onChange?: () => void;
		onSubmit?: () => void;
		title: () => string,
		label: () => string,
	}

	let {
		isOpen = $bindable(),
		inputValue = $bindable(),
		saveButtonLabel,
		onChange,
		onSubmit,
		title,
		label,
	}: Props = $props();

</script>



<DialogWrapper
	bind:isOpen
	{header}
	{content}
	{onChange}
	fixedHeight={false}
	size="sm"
/>


{#snippet header()}
	<Dialog.Title>
		{ title() }
	</Dialog.Title>
{/snippet}


{#snippet content()}
	<form
		onsubmit={onSubmit}
		class="p-0.5 pt-0 -mt-1"
	>
		<Label
			for="name"
			class="text-right"
		>
			{ label() }
		</Label>

		<Input
			id="name"
			bind:value={inputValue}
			required
			class=""
		/>

		<Dialog.Footer>
			<Button
				type="submit"
				class="mt-6 w-full"
			>
				{ saveButtonLabel() }
			</Button>
		</Dialog.Footer>
	</form>
{/snippet}
