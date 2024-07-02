<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';

	export let startDateValue: Date | undefined;
	export let endDateValue: Date | undefined;

	function setDates() {
		startDateValue = new Date(new Date().getFullYear() - 1, 0, 1)
		endDateValue = new Date(new Date().getFullYear() - 1, 11, 31)
	}
</script>


<Button variant="outline" on:click={setDates}>
	Minulý rok
</Button>
