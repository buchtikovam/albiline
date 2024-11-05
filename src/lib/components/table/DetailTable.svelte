<script lang="ts">
	import { Checkbox } from '$lib/components/ui/checkbox';
	import Trash2 from 'lucide-svelte/icons/trash-2';
	import * as ContextMenu from "$lib/components/ui/context-menu";
	import * as Table from "$lib/components/ui/table";
	import { _ } from 'svelte-i18n'

	export let tableDef;
	export let tableData;
	export let translationRoute;

</script>


<Table.Root class="w-full mt-2">
	<ContextMenu.Root>
		<ContextMenu.Trigger>
			<Table.Header class="border-b">
				{#each tableDef as column}
					<Table.Head>
						{@html $_(translationRoute + ".customer_and_address_contact." + column.field)}
					</Table.Head>
				{/each}
			</Table.Header>

			<Table.Body>
				{#each $tableData as row}
					<Table.Row class="contactRow">
						{#each tableDef as column}
							{#if column.type === 'checkbox'}
								<Table.Cell >
									<div class="w-full flex">
										<Checkbox
											class="bg-slate-50"
											bind:checked={row[column.field]}
										/>
									</div>
								</Table.Cell>

							{/if}

							{#if column.type === 'text'}
								<Table.Cell class="max-w-60">
									{row[column.field]}
								</Table.Cell>
							{/if}
						{/each}
					</Table.Row>
				{/each}
			</Table.Body>
		</ContextMenu.Trigger>

		<ContextMenu.Content>
			<ContextMenu.Item class="text-sm flex gap-2">
				<Trash2 class="size-4"/>
				Smazat kontakt
			</ContextMenu.Item>
		</ContextMenu.Content>
	</ContextMenu.Root>
</Table.Root>
