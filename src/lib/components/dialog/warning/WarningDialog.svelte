<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';


	interface Props {
		open: boolean;
		message: string;
		desription: string;
		buttonAllowLabel: string;
		buttonDenyLabel: string;
		consent: boolean;
	}

	let {
		open = $bindable(true),
		message,
		desription,
		buttonAllowLabel,
		buttonDenyLabel,
		consent = $bindable(false)
	}: Props = $props();


	function consentAllow() {
		open = false;
		consent = true;
	}


	function consentDenied() {
		open = false;
		consent = false;
	}
</script>



<Dialog.Root bind:open={open}>
	<Dialog.Content class="!w-[360px] overflow-visible">
		<Dialog.Header>
			<Dialog.Title class="h-6 mb-1">
				{message}
			</Dialog.Title>

			<Dialog.Description>
				{desription}
			</Dialog.Description>
		</Dialog.Header>


		<Dialog.Footer class="mt-4">
			<Button
				class="w-full bg-albi-500 text-background font-bolder"
				onclick={consentAllow}
			>
				{buttonAllowLabel}
			</Button>

			<Button
				class="w-full bg-red-500 text-background font-bolder"
				onclick={consentDenied}
			>
				{buttonDenyLabel}
			</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
