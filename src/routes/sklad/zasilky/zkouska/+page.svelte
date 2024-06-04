<script lang="ts">
	import InputDialogDate from '$lib/components/input-dialog/InputDialogDate.svelte';
	import { onMount } from 'svelte';

	let openDialog: boolean;

	onMount(() => {
		openDialog = true;
	})
</script>

<InputDialogDate open={openDialog}/>
