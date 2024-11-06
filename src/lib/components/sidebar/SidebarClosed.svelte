<script lang="ts">
	import { handleTabClick } from '$lib/utils/components/sidebar/handleTabClick';
	import { Separator } from '$lib/components/ui/separator';
	import type { SidebarItem } from '$lib/types/components/sidebar/sidebar';
	import SidebarToggleButton from './SidebarToggleButton.svelte';
	import Search from 'lucide-svelte/icons/search';
	import { _ } from 'svelte-i18n'
	import * as Tooltip from '$lib/components/ui/tooltip';
	import * as Popover from '$lib/components/ui/popover';

	export let filteredItems: SidebarItem[];
	export let isSidebarCommandOpen: boolean;
	export let isSidebarOpen: boolean;
</script>



<div class="flex-1">
	<nav class="flex flex-col gap-2 justify-center">
		<Tooltip.Root openDelay={800}>
			<button on:click={() => isSidebarCommandOpen = !isSidebarCommandOpen}>
				<Tooltip.Trigger>
					<span class="flex text-sm font-medium  items-center gap-3 rounded-lg p-2 text-albi-950 hover:text-black hover:bg-muted/50">
					<Search />
					</span>
				</Tooltip.Trigger>
			</button>

			<Tooltip.Content class="ml-12 mt-12">
				{$_('components.sidebar.search_tooltip')}
			</Tooltip.Content>
		</Tooltip.Root>


		<Separator class="mx-auto w-8 bg-albi-200 h-[2px]"/>


		{#each filteredItems as item}
			<!-- item s children položkami. Po najetí myši ukáže tooltip a po kliknutí popover se všemi children položkami -->
			{#if item.children.length > 0}
				<Tooltip.Root openDelay={800}>
					<Tooltip.Trigger>
						<Popover.Root>
							<Popover.Trigger>
								<div
									class="flex text-sm font-medium  items-center gap-3 rounded-lg p-2 text-albi-950 hover:text-black hover:bg-muted/50">
									<svelte:component this={item.icon} />
								</div>
							</Popover.Trigger>

							<Popover.Content class="flex flex-col px-1 py-1 ml-12 -mt-10 text-sm w-fit ">
								{#each item.children as child}
									<a
										href={child.href}
										class="hover:bg-muted/50 rounded px-2 py-1.5"
										on:click={() => handleTabClick(child, 1)}
									>
										{$_('components.sidebar.' + child.field)}
									</a>

									{#if child.children.length > 0}
										{#each child.children as scndChild}
											<a
												href={scndChild.href}
												class="hover:bg-muted/50 rounded pr-2 pl-6 py-1.5"
												on:click={() => handleTabClick(scndChild, 2)}
											>
												{$_('components.sidebar.' + scndChild.field)}
											</a>
										{/each}
									{/if}
								{/each}
							</Popover.Content>
						</Popover.Root>
					</Tooltip.Trigger>

					<Tooltip.Content class="ml-12 mt-12">
						{$_('components.sidebar.' + item.field)}
					</Tooltip.Content>
				</Tooltip.Root>

				<!-- item bez children položek. Po najetí myši ukáže tooltip -->
			{:else }
				<Tooltip.Root openDelay={800}>
					<Tooltip.Trigger>
						<a
							href={item.href}
							class="flex text-sm font-medium items-center gap-3 rounded-lg px-2 py-2 hover:bg-muted/50 text-albi-950 hover:text-black"
							on:click={() => handleTabClick(item, 0)}
						>
							<svelte:component this={item.icon} />
						</a>
					</Tooltip.Trigger>

					<Tooltip.Content class="ml-12 mt-12">
						{$_('components.sidebar.' + item.field)}
					</Tooltip.Content>
				</Tooltip.Root>
			{/if}
		{/each}
	</nav>
</div>

<div class="flex justify-center pb-2">
	<SidebarToggleButton bind:isSidebarOpen />
</div>
