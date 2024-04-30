type Product = {
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


export const data: Product[] = [
	{
		id: '1',
		ksp: 81035,
		jmeno: 'Rozkládací kůň',
		typ: 'Produkt',
		linie: 'Přání',
		koncepce: 'ostatní',
		klp: 'P',
		listovaciPolozka: 'Přání do obálky',
		prodCena: 65,
		skladem: 265,
		vyrobeno: 58991
	}, {
		'id': '2',
		'ksp': 81036,
		'jmeno': 'Dřevěný domeček pro panenky',
		'typ': 'Produkt',
		'linie': 'Dětský svět',
		'koncepce': 'Hračky',
		'klp': 'D',
		'listovaciPolozka': 'Hračky',
		'prodCena': 129,
		'skladem': 185,
		'vyrobeno': 23456
	},
	{
		'id': '3',
		'ksp': 81037,
		'jmeno': 'Pletená šála s třpytkami',
		'typ': 'Produkt',
		'linie': 'Dámská móda',
		'koncepce': 'Doplňky',
		'klp': 'O',
		'listovaciPolozka': 'Dámské doplňky',
		'prodCena': 399,
		'skladem': 43,
		'vyrobeno': 8765
	},
	{
		'id': '4',
		'ksp': 81038,
		'jmeno': 'Sada hrnců s nepřilnavým povrchem',
		'typ': 'Produkt',
		'linie': 'Domácnost',
		'koncepce': 'Kuchyňské potřeby',
		'klp': 'H',
		'listovaciPolozka': 'Kuchyňské vybavení',
		'prodCena': 1999,
		'skladem': 12,
		'vyrobeno': 1234
	},
	{
		'id': '5',
		'ksp': 81039,
		'jmeno': 'Chytrý telefon s velkým displejem',
		'typ': 'Produkt',
		'linie': 'Elektronika',
		'koncepce': 'Mobilní telefony',
		'klp': 'E',
		'listovaciPolozka': 'Mobilní telefony',
		'prodCena': 9999,
		'skladem': 5,
		'vyrobeno': 321
	},
	{
		'id': '6',
		'ksp': 81040,
		'jmeno': 'Horské kolo',
		'typ': 'Produkt',
		'linie': 'Sport',
		'koncepce': 'Kola',
		'klp': 'S',
		'listovaciPolozka': 'Sportovní vybavení',
		'prodCena': 14999,
		'skladem': 2,
		'vyrobeno': 100
	},
	{
		'id': '7',
		'ksp': 81041,
		'jmeno': 'Sada LEGO® City Vesmírná raketa',
		'typ': 'Produkt',
		'linie': 'Dětský svět',
		'koncepce': 'Hračky',
		'klp': 'D',
		'listovaciPolozka': 'Hračky',
		'prodCena': 599,
		'skladem': 150,
		'vyrobeno': 7890
	},
	{
		'id': '8',
		'ksp': 81042,
		'jmeno': 'Dámské kožené boty na podpatku',
		'typ': 'Produkt',
		'linie': 'Dámská móda',
		'koncepce': 'Obuv',
		'klp': 'O',
		'listovaciPolozka': 'Dámská obuv',
		'prodCena': 1499,
		'skladem': 32,
		'vyrobeno': 4321
	},
	{
		'id': '9',
		'ksp': 81043,
		'jmeno': 'Mikrovlnná trouba s grilem',
		'typ': 'Produkt',
		'linie': 'Domácnost',
		'koncepce': 'Malé spotřebiče',
		'klp': 'H',
		'listovaciPolozka': 'Malé spotřebiče',
		'prodCena': 2499,
		'skladem': 8,
		'vyrobeno': 1234
	}
	// {
	// 	'id': '10',
	// 	'ksp': 81044,
	// 	'jmeno': 'Notebook s dotykovou obrazovkou',
	// 	'typ': 'Produkt',
	// 	'linie': 'Elektronika',
	// 	'koncepce': 'Notebooky',
	// 	'klp': 'E',
	// 	'listovaciPolozka': 'Notebooky',
	// 	'prodCena': 49999,
	// 	'skladem': 1,
	// 	'vyrobeno': 100
	// },
	// {
	// 	'id': '11',
	// 	'ksp': 81045,
	// 	'jmeno': 'Pánské běžecké boty',
	// 	'typ': 'Produkt',
	// 	'linie': 'Sport',
	// 	'koncepce': 'Obuv',
	// 	'klp': 'S',
	// 	'listovaciPolozka': 'Sportovní obuv',
	// 	'prodCena': 1299,
	// 	'skladem': 75,
	// 	'vyrobeno': 5678
	// }, {
	// 	'id': '12',
	// 	'ksp': 81046,
	// 	'jmeno': 'Sada nádobí pro 12 osob',
	// 	'typ': 'Produkt',
	// 	'linie': 'Domácnost',
	// 	'koncepce': 'Stolování',
	// 	'klp': 'H',
	// 	'listovaciPolozka': 'Stolní nádobí',
	// 	'prodCena': 1999,
	// 	'skladem': 50,
	// 	'vyrobeno': 9876
	// },
	// {
	// 	'id': '13',
	// 	'ksp': 81047,
	// 	'jmeno': 'Dětská zimní bunda s kapucí',
	// 	'typ': 'Produkt',
	// 	'linie': 'Dětský svět',
	// 	'koncepce': 'Oblečení',
	// 	'klp': 'D',
	// 	'listovaciPolozka': 'Dětské oblečení',
	// 	'prodCena': 1499,
	// 	'skladem': 120,
	// 	'vyrobeno': 4321
	// },
	// {
	// 	'id': '14',
	// 	'ksp': 81048,
	// 	'jmeno': 'Sada hrnců a pánví z nerezové oceli',
	// 	'typ': 'Produkt',
	// 	'linie': 'Domácnost',
	// 	'koncepce': 'Kuchyňské potřeby',
	// 	'klp': 'H',
	// 	'listovaciPolozka': 'Kuchyňské vybavení',
	// 	'prodCena': 3499,
	// 	'skladem': 15,
	// 	'vyrobeno': 1234
	// },
	// {
	// 	'id': '15',
	// 	'ksp': 81049,
	// 	'jmeno': 'Herní sluchátka s mikrofonem',
	// 	'typ': 'Produkt',
	// 	'linie': 'Elektronika',
	// 	'koncepce': 'Příslušenství k počítačům',
	// 	'klp': 'E',
	// 	'listovaciPolozka': 'Příslušenství k PC',
	// 	'prodCena': 999,
	// 	'skladem': 80,
	// 	'vyrobeno': 7654
	// },
	// {
	// 	'id': '16',
	// 	'ksp': 81050,
	// 	'jmeno': 'Pánské hodinky s chronografem',
	// 	'typ': 'Produkt',
	// 	'linie': 'Móda',
	// 	'koncepce': 'Hodinky',
	// 	'klp': 'O',
	// 	'listovaciPolozka': 'Pánské hodinky',
	// 	'prodCena': 4999,
	// 	'skladem': 10,
	// 	'vyrobeno': 321
	// }, {
	// 	'id': '17',
	// 	'ksp': 81051,
	// 	'jmeno': 'Sada povlečení s květinovým vzorem',
	// 	'typ': 'Produkt',
	// 	'linie': 'Domácnost',
	// 	'koncepce': 'Ložní prádlo',
	// 	'klp': 'H',
	// 	'listovaciPolozka': 'Ložní prádlo',
	// 	'prodCena': 1299,
	// 	'skladem': 60,
	// 	'vyrobeno': 8765
	// },
	// {
	// 	'id': '18',
	// 	'ksp': 81052,
	// 	'jmeno': 'Dětská stavebnice z kostek',
	// 	'typ': 'Produkt',
	// 	'linie': 'Dětský svět',
	// 	'koncepce': 'Hračky',
	// 	'klp': 'D',
	// 	'listovaciPolozka': 'Hračky',
	// 	'prodCena': 499,
	// 	'skladem': 180,
	// 	'vyrobeno': 5678
	// },
	// {
	// 	'id': '19',
	// 	'ksp': 81053,
	// 	'jmeno': 'Chytrý telefon s duálním fotoaparátem',
	// 	'typ': 'Produkt',
	// 	'linie': 'Elektronika',
	// 	'koncepce': 'Mobilní telefony',
	// 	'klp': 'E',
	// 	'listovaciPolozka': 'Mobilní telefony',
	// 	'prodCena': 7999,
	// 	'skladem': 25,
	// 	'vyrobeno': 1234
	// },
	// {
	// 	'id': '20',
	// 	'ksp': 81054,
	// 	'jmeno': 'Dámská kabelka z pravé kůže',
	// 	'typ': 'Produkt',
	// 	'linie': 'Dámská móda',
	// 	'koncepce': 'Doplňky',
	// 	'klp': 'O',
	// 	'listovaciPolozka': 'Dámské doplňky',
	// 	'prodCena': 2999,
	// 	'skladem': 15,
	// 	'vyrobeno': 4321
	// },
	// {
	// 	'id': '21',
	// 	'ksp': 81055,
	// 	'jmeno': 'Horské kolo s elektro motorem',
	// 	'typ': 'Produkt',
	// 	'linie': 'Sport',
	// 	'koncepce': 'Kola',
	// 	'klp': 'S',
	// 	'listovaciPolozka': 'Sportovní vybavení',
	// 	'prodCena': 39999,
	// 	'skladem': 3,
	// 	'vyrobeno': 100
	// },
	// {
	// 	'id': '22',
	// 	'ksp': 81056,
	// 	'jmeno': 'Sada nádobí pro 6 osob',
	// 	'typ': 'Produkt',
	// 	'linie': 'Domácnost',
	// 	'koncepce': 'Stolování',
	// 	'klp': 'H',
	// 	'listovaciPolozka': 'Stolní nádobí',
	// 	'prodCena': 999,
	// 	'skladem': 30,
	// 	'vyrobeno': 7654
	// },
	// {
	// 	'id': '23',
	// 	'ksp': 81057,
	// 	'jmeno': 'Dětská knížka s pohádkami',
	// 	'typ': 'Produkt',
	// 	'linie': 'Dětský svět',
	// 	'koncepce': 'Knihy',
	// 	'klp': 'D',
	// 	'listovaciPolozka': 'Dětské knihy',
	// 	'prodCena': 399,
	// 	'skladem': 150,
	// 	'vyrobeno': 5678
	// },
	// {
	// 	'id': '24',
	// 	'ksp': 81058,
	// 	'jmeno': 'Fitness náramek s tepovou frekvencí',
	// 	'typ': 'Produkt',
	// 	'linie': 'Sport',
	// 	'koncepce': 'Sportovní elektronika',
	// 	'klp': 'S',
	// 	'listovaciPolozka': 'Sportovní elektronika',
	// 	'prodCena': 1999,
	// 	'skladem': 65,
	// 	'vyrobeno': 1234
	// },
	// {
	// 	'id': '25',
	// 	'ksp': 81059,
	// 	'jmeno': 'Pánská košile s dlouhým rukávem',
	// 	'typ': 'Produkt',
	// 	'linie': 'Móda',
	// 	'koncepce': 'Oblečení',
	// 	'klp': 'O',
	// 	'listovaciPolozka': 'Pánské oblečení',
	// 	'prodCena': 999,
	// 	'skladem': 80,
	// 	'vyrobeno': 4321
	// }
];
