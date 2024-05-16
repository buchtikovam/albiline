<script>
	import { dndzone ,SHADOW_ITEM_MARKER_PROPERTY_NAME } from 'svelte-dnd-action';
	import { fade } from "svelte/transition";
	import { flip } from "svelte/animate";
	import { cubicIn } from "svelte/easing";
	let items = [
		{id: 1, name: "Scooby", favourite: true},
		{id: 2, name: "Tom", favourite: false},
		{id: 3, name: "Jerry", favourite: false},
		{id: 4, name: "Popeye", favourite: true}
	];

	let columns = [
		{id: 1, name: "id" },
		{id: 2, name: "name"},
		{id: 3, name: "favourite"},
	];

	const flipDurationMs = 300;
	function handleDndConsiderColumn(e) {
		columns = e.detail.items;
	}
	function handleDndFinalizeColumn(e) {
		columns = e.detail.items;
	}

	const getClasses = (item) => {
		return item[SHADOW_ITEM_MARKER_PROPERTY_NAME]
			? 'dragging'
			: ''
	}

</script>

<h1>Tablesome column re-order Experiment</h1>

<table>
	<thead>
	<tr use:dndzone="{{items: columns, flipDurationMs, dropTargetStyle: {} }}" on:consider={handleDndConsiderColumn} on:finalize={handleDndFinalizeColumn}>
		{#each columns as column,index (column.id)}
			<th animate:flip={{ duration: flipDurationMs  }} class="{getClasses(column)}">
				{column.name}
				{#if column[SHADOW_ITEM_MARKER_PROPERTY_NAME]}
					<div in:fade={{ duration: 200, easing: cubicIn }} class="placeholder" />
				{/if}
			</th>
		{/each}
	</tr>
	</thead>
	<tbody>
	{#each items as item,index (item.id)}
		<tr tabindex=0 class="{getClasses(item)}" >
			{#each columns as column,index (column.id)}
				<td animate:flip={{ duration: flipDurationMs  }}>
					{#if column["name"] == "favourite"}
						<input type="checkbox" checked={item["favourite"]} id="enabled_{item.id}" name="enabled_{item.id}">
					{:else}
						{item[column["name"]]}
					{/if}
				</td>
			{/each}
		</tr>
	{/each}
	</tbody>
</table>

<style>
	table {
		width:100%;
		table-layout: fixed;
		border-collapse: collapse;
	}
	th{
		text-transform: uppercase;
		border: 2px solid lightgray;
		padding: 10px;
		position: relative;
	}
	td {
		border: 2px solid lightgray;
		text-align: center;
		padding: 10px;
	}

	.dragging {
		background: whitesmoke;
		opacity: 0.8;
	}
	.placeholder{
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		visibility: visible;
		background-color: #edf2f7;
		border: 3px dashed #cbd5e0;
		margin: 0;
	}
</style>
