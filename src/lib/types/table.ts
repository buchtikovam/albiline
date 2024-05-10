export type Product = {
	id: string
	ksp: number;
	jmeno: string
	typ: string;
	linie: string;
	koncepce: string;
	klp: string;
	listovaciPolozka: string;
	prodCena: number;
	skladem: number;
	vyrobeno: number;
};

export type Column = {
	accessor: string,
	header: string,
	type: 'id' | 'string' | 'currency' | 'checkbox';
	cellSize: 'small' | 'medium' | 'large' | 'xlarge' | 'checkbox';
}

