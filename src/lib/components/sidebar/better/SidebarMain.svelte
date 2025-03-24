<script lang="ts">
	import type {SidebarItem} from "$lib/types/components/sidebar/sidebar";
	import {handleTabClick} from "$lib/utils/components/sidebar/handleTabClick";
	import ChevronRight from "lucide-svelte/icons/chevron-right";
	import * as Collapsible from "$lib/components/ui/collapsible";
	import * as Sidebar from "$lib/components/ui/sidebar";

	interface Props {
		sidebarItems: SidebarItem[];
	}

	let {
		sidebarItems = $bindable()
	}: Props = $props();
</script>



<Sidebar.Group>
	<Sidebar.Menu>
		{#each sidebarItems as item (item.field)}
			<Collapsible.Root open={item.open} class="group/collapsible">
				{#snippet child({ props })}
					<Sidebar.MenuItem {...props} class={item.hide ? "hidden" : "block"}>
						<Collapsible.Trigger>
							{#snippet child({ props })}
								<Sidebar.MenuButton {...props}>
									{#snippet tooltipContent()}
										{item.translation()}
									{/snippet}

									{@const Icon = item.icon}
									{#if item.icon}
										<Icon />
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
													<a
														href={subItem.href}
														onclick={() => {handleTabClick(subItem, 1);}}
														{...props}
													>
														<span>
															{subItem.translation()}
														</span>
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
