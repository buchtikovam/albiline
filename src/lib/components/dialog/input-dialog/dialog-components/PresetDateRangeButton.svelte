<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import type { DialogDateRangeButton } from '$lib/types/input-dialog/inputDialog';
	import type { DateValue } from '@internationalized/date';
	import { getDatesByAction } from '$lib/utils/getDatesByAction';

	// TODO: make into groups, generate only by string array

	export let item: DialogDateRangeButton;
	export let startDateValue: DateValue | undefined;
	export let endDateValue: DateValue | undefined;

	console.log(startDateValue, endDateValue);
</script>


<Button on:click={() => getDatesByAction(item.action)} variant="outline">
	{item.label}
</Button>
