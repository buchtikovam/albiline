<script lang="ts">
	import { Separator } from '$lib/components/ui/separator';
	import { handleTabClick } from '$lib/utils/components/sidebar/handleTabClick';
	import Search from 'lucide-svelte/icons/search';
	import type { SidebarItem } from '$lib/types/components/sidebar/sidebar';
	import SidebarToggleButton from './SidebarToggleButton.svelte';
	import * as m from "$lib/paraglide/messages.js"
	import * as Tooltip from '$lib/components/ui/tooltip';
	import * as Popover from '$lib/components/ui/popover';

	interface Props {
		filteredItems: SidebarItem[];
		isSidebarCommandOpen: boolean;
	}

	let {
		filteredItems = $bindable(),
		isSidebarCommandOpen = $bindable()
	}: Props = $props();
</script>



<div class="flex-1">
	<nav class="flex flex-col gap-2 justify-center">
		<Tooltip.Root>
			<button onclick={() => isSidebarCommandOpen = !isSidebarCommandOpen}>
				<Tooltip.Trigger>
					<span class="flex text-sm font-medium  items-center gap-3 rounded-lg p-2 text-albi-950 hover:text-black hover:bg-muted/50">
						<Search />
					</span>
				</Tooltip.Trigger>
			</button>

			<Tooltip.Content side="right">
				{m.components_sidebar_closed_search_tooltip()}
			</Tooltip.Content>
		</Tooltip.Root>


		<Separator class="mx-auto w-8 bg-albi-200 h-[2px]"/>


		{#each filteredItems as item}
			<!-- item s children položkami. Po najetí myši ukáže tooltip a po kliknutí popover se všemi children položkami -->
			{#if item.children.length > 0}
				<Tooltip.Root>
					<Tooltip.Trigger>
						<Popover.Root>
							<Popover.Trigger>
								{@const Icon = item.icon}
								<div
									class="flex text-sm font-medium  items-center gap-3 rounded-lg p-2 text-albi-950 hover:text-black hover:bg-muted/50">
									<Icon />
								</div>
							</Popover.Trigger>

							<Popover.Content class="flex flex-col px-1 py-1 ml-12 -mt-10 text-sm w-fit ">
								{#each item.children as child}
									<a
										href={child.href}
										class="hover:bg-muted/50 rounded px-2 py-1.5"
										onclick={() => handleTabClick(child, 1)}
									>
										{child.translation()}
									</a>

									{#if child.children.length > 0}
										{#each child.children as scndChild}
											<a
												href={scndChild.href}
												class="hover:bg-muted/50 rounded pr-2 pl-6 py-1.5"
												onclick={() => handleTabClick(scndChild, 2)}
											>
												{scndChild.translation()}
											</a>
										{/each}
									{/if}
								{/each}
							</Popover.Content>
						</Popover.Root>
					</Tooltip.Trigger>

					<Tooltip.Content side="right">
						{item.translation()}
					</Tooltip.Content>
				</Tooltip.Root>

				<!-- item bez children položek. Po najetí myši ukáže tooltip -->
			{:else }
				<Tooltip.Root >
					<Tooltip.Trigger class="flex justify-center">
						{@const Icon = item.icon}
						<a
							href={item.href}
							class="flex text-sm font-medium  items-center gap-3 rounded-lg p-2 text-albi-950 hover:text-black hover:bg-muted/50"
							onclick={() => handleTabClick(item, 0)}
						>
							<Icon />
						</a>
					</Tooltip.Trigger>

					<Tooltip.Content side="right">
						{item.translation()}
					</Tooltip.Content>
				</Tooltip.Root>
			{/if}
		{/each}
	</nav>
</div>

<div class="flex justify-center pb-2">
	<SidebarToggleButton />
</div>
