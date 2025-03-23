<script lang="ts">
	import * as Sidebar from "$lib/components/ui/sidebar";
	import * as Collapsible from "$lib/components/ui/collapsible";

	import ChevronRight from "lucide-svelte/icons/chevron-right";
	import {allItems} from "$lib/definitions/components/sidebar/sidebar";

</script>


<Sidebar.Group>
	<Sidebar.Menu>
		{#each allItems as item (item.field)}
			<Collapsible.Root open={item.open} class="group/collapsible">
				{#snippet child({ props })}
					<Sidebar.MenuItem {...props}>
						<Collapsible.Trigger>
							{#snippet child({ props })}
								<Sidebar.MenuButton {...props}>
									{#snippet tooltipContent()}
										{item.translation()}
									{/snippet}

									{#if item.icon}
										<item.icon />
									{/if}

									<span>{item.translation()}</span>
									<ChevronRight
										class="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"
									/>
								</Sidebar.MenuButton>
							{/snippet}
						</Collapsible.Trigger>
						<Collapsible.Content class="transition-all">
							{#if item.children.length > 0}
								<Sidebar.MenuSub>
									{#each item.children as subItem (subItem.field)}
										<Sidebar.MenuSubItem>
											<Sidebar.MenuSubButton>
												{#snippet child({ props })}
													<a href={subItem.href} {...props}>
														<span>{subItem.translation()}</span>
													</a>
												{/snippet}
											</Sidebar.MenuSubButton>
										</Sidebar.MenuSubItem>
									{/each}
								</Sidebar.MenuSub>
							{/if}
						</Collapsible.Content>
					</Sidebar.MenuItem>
				{/snippet}
			</Collapsible.Root>
		{/each}
	</Sidebar.Menu>
</Sidebar.Group>
