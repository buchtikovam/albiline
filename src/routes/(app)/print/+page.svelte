<script lang="ts">
	import {Button} from "$lib/components/ui/button";
	import {getPrinters, getPrintManagerStatus} from "$lib/api/printerService.svelte";
</script>



<Button
	onclick={getPrintManagerStatus}
	class="w-fit"
>
	Check status
</Button>

<Button
	onclick={getPrinters}
	class="w-fit"
>
	Print printers
</Button>
