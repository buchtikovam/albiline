<script>
	import {
		InputDialogZakaznici,
		InputDialogZakazniciSelectOptions
	} from "$lib/data/input-dialog/prodej/zakaznici/InputDialogZakaznici";
	import InputDialog from "$lib/components/dialog/input/InputDialog.svelte";

	let open = $state(true);
</script>



<InputDialog
	bind:open
	defaultInputDialog={InputDialogZakaznici}
	selectOptions={InputDialogZakazniciSelectOptions}
/>
