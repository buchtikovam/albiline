<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Download, Filter, Printer, Upload } from 'lucide-svelte';
</script>

<div class="flex gap-2">
	<div class="flex-1">
		<Button>Akce 1</Button>
		<Button>Akce 2</Button>
		<Button>Akce 3</Button>
	</div>
	<div>
		<Button><Upload class="mr-2 h-4 w-4" /> Import</Button>
		<Button><Download class="mr-2 h-4 w-4" /> Export</Button>
		<Button><Printer class="mr-2 h-4 w-4" /> Tisk</Button>
	</div>
</div>
<div class="flex-1 rounded-lg border bg-card text-card-foreground shadow-sm p-4">
	<div class="flex gap-2">
		<div class="flex-1">
			// search
		</div>
		<div>
			<Button><Filter class="mr-2 h-4 w-4" /> Filtr</Button>
		</div>
	</div>
	<div class="p-4">
		// table
	</div>
</div>
