interface ProductStockInventoryType {
	productId: number;
	productCode: string; // Výrobek : KSP
	productName: string; // Výrobek : Název
	costLevelCode: string; // Výrobek : KLP

	quantity: number; // Skladem
	quantityAvailable: number; // K dispozici

	quanatityReservation: number; // Blokováno
	quantityAfterReservation: number; // Po blokacích

	quantity_997: number; // Expedice : Skladem
	expectedQuantity_997: number; // Expedice : Očekávané

	quantity_996: number; // Krabicový sklad : Skladem
	expectedQuantity_996: number; // Krabicový sklad : Očekávané

	quantity_999: number; // Paletový sklad : Skladem
	expectedQuantity_999: number; // Paletový sklad : Očekávané

	quantity_ExternalWH: number; // Externí sklady : Skladem
	expectedQuantity_ExternalWH: number; // Externí sklady : Očekávané

	quantity_840: number; // Akční sklad : Skladem
	expectedQuantity_840: number; // Akční sklad : Očekávané

	quantity_InterimWH: number; // Mezisklad : Skladem
	expectedQuantity_InterimWH: number; // Mezisklad : Očekávané

	supplierOrderQuantity: number; // Objednáno

	enabledCZ: number; // CZ
	enabledSK: number; // SK
	enabledPL: number; // PL
	isForExport: number;  // Export

	divisionName: string; // Výrobek : Divize
	costLevelName: string; // Výrobek : Listovací položka
	productGroupName: string; // Výrobek : Skupina
	conceptionName: string; // Výrobek : Koncepce
	productTypeName: string; // Výrobek : Typ
	seasonCode: string; // Výrobek : Sezóna
	phaseCode: string; // Výrobek : Fáze
	preferenceCode: string; // Výrobek : Preference

	releaseDate: string; // Uvedení na trh
	exportCountryStringAgg: string; // Export
}
