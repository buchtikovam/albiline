import type {
	IDoesFilterPassParams,
	IFilterComp,
	IFilterParams,
	IAfterGuiAttachedParams
} from 'ag-grid-community';



export class BooleanFilter implements IFilterComp {
	private filterParams!: IFilterParams;
	private selectedValue: boolean | null = null;
	private gui!: HTMLDivElement;
	private selectElement!: HTMLSelectElement;

	init(params: IFilterParams): void {
		this.filterParams = params;
		this.setupGui();
	}

	private setupGui() {
		this.gui = document.createElement('div');
		this.gui.innerHTML = `
            <div class="boolean-filter p-2">
                <select 
					class="ag-select border w-full rounded-none"
				>
                    <option 
						value=""
					>
						Všechno
					</option>
					
                    <option 
						value="true"
					>
						Pravda
					</option>
					
                    <option 
						value="false"
					>
						Nepravda
					</option>
                </select>
            </div>
        `;

		this.selectElement = this.gui.querySelector('select')!;
		this.selectElement.addEventListener('change', () => {
			const value = this.selectElement.value;
			this.selectedValue = value === '' ? null : value === 'true';
			this.filterParams.filterChangedCallback();
		});
	}

	getGui(): HTMLElement {
		return this.gui;
	}

	doesFilterPass(params: IDoesFilterPassParams): boolean {
		const cellValue = this.filterParams.getValue(params.node);
		if (this.selectedValue === null) return true;
		return cellValue === this.selectedValue;
	}

	isFilterActive(): boolean {
		return this.selectedValue !== null;
	}

	getModel(): {
		filterType: 'boolean',
		filter: boolean | null
	} | null {
		if (!this.isFilterActive()) return null;
		return {
			filterType: 'boolean',
			filter: this.selectedValue
		};
	}

	setModel(
		model: { filterType: 'boolean', filter: boolean | null } | null
	): void {
		if (!model) {
			this.selectedValue = null;
			this.selectElement.value = '';
		} else {
			this.selectedValue = model.filter;
			this.selectElement.value = model.filter === null ? '' : model.filter.toString();
		}
	}

	afterGuiAttached?(params?: IAfterGuiAttachedParams): void {
		if (!params?.suppressFocus) {
			this.selectElement.focus();
		}
	}

	destroy?(): void {
		this.selectElement.removeEventListener('change', () => {});
	}
}
