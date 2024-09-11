export type InvoiceData = {
	header: InvoiceHeader,
	items: InvoiceItem[],
	vat: InvoiceVat
}

export type InvoiceHeader = {
  documentCode: number;
  cislO_OBJEDNAVKA: number | null;
  prodejna: number;
  datprod: Date;
  datplneni: Date;
  datsplat: Date;
  cenabezdph: number;
  fox_dodavka_cenasdph: number;
  dph: number;
  id_zajisteni: string;
  pocet_baleni: number;
  komise: number;
  from_auto: string;
  id_kz: number;
  zpusob_platba: string;
  ico: string;
  dic: string;
  ic_dph: string;
  nazev_fa: string;
  nazev_fa2: string | null;
  ulice_fa: string;
  misto_fa: string;
  mdnazev: string;
  mdnazev2: string | null;
  mdulice: string;
  jmeno: string;
  mdmisto: string;
  telefon: string;
  mobil: string;
  id_dodavatel: number | null;
  id_albi_dodavatel: number | null;
  tisk_cena: number;
  dealer: string;
  ean_fa: string;
  faktury_dobropis: string | null;
  cena_final: number;
  vymena: number;
  slovy: string;
  datprod_slovy: string;
  datsplat_slovy: string;
  id_oz: number;
  packingUserCode: string | null;
  packagingInfo: string;
}

export type InvoiceItem = {
      id_aplikace: number,
      cena_rabat: number
      celkem: number,
      quantity: number,
      rabat: number,
      cislo_objednavka: number|null,
      cena_j: number,
      moc: number,
      zkratka_kategorie: string,
      popis: string,
      ean: string,
      recyclingfee_cz: number|null,
      sazba_dph: number,
      id_obi: null
}

export type InvoiceVat = {
	sazba_dph_0: number,
    cenabezdph_0: number,
    cenasdph_0: number,
    sazba_dph_l: number,
    cenabezdph_l: number,
    cenasdph_l: number,
    sazba_dph_l2: number,
    cenabezdph_l2: number,
    cenasdph_l2: number,
	sazba_dph_h: number,
    cenabezdph_h: number,
    cenasdph_h: number
};
