export const customerDetailContactsTableDef = [
	{
		headerName: 'Výchozí',
		variableName: 'default',
		type: 'checkbox'
	},
	{
		headerName: 'Aktivní',
		variableName: 'active',
		type: 'checkbox'
	},
	{
		headerName: 'Jméno',
		variableName: 'name',
		type: 'text'
	},
	{
		headerName: 'Příjmení',
		variableName: 'lastName',
		type: 'text'
	},
	{
		headerName: 'Mobil',
		variableName: 'phoneNumber',
		type: 'text'
	},
	{
		headerName: 'Pevná linka',
		variableName: 'pevnaLinka',
		type: 'text'
	},
	{
		headerName: 'E-mail',
		variableName: 'email',
		type: 'text'
	},
	{
		headerName: 'Poznámka',
		variableName: 'note',
		type: 'text'
	},
	{
		headerName: 'FA <span class="whitespace-nowrap">e-mailem</span> v PDF',
		variableName: 'faPDF',
		type: 'checkbox'
	},
	{
		headerName: 'DL <span class="whitespace-nowrap">e-mailem</span> v PDF',
		variableName: 'dlPDF',
		type: 'checkbox'
	},
	{
		headerName: 'FA <span class="whitespace-nowrap">e-mailem</span> v CSV',
		variableName: 'faCSV',
		type: 'checkbox'
	},

	{
		headerName: 'DL <span class="whitespace-nowrap">e-mailem</span> v CSV',
		variableName: 'dlCSV',
		type: 'checkbox'
	},
	{
		headerName: 'AZ o svozu zásilky',
		variableName: 'azSvoz',
		type: 'checkbox'
	},
	{
		headerName: 'AZ o expedici zásilky',
		variableName: 'azExpedice',
		type: 'checkbox'
	}
]

export const customerDetailContactsTableData = [ // temp
	{
		default: false,
		active: true,
		name: 'John',
		lastName: 'Doe',
		phoneNumber: '+420 123 456 789',
		pevnaLinka: '+420 987 654 321',
		email: 'johndoe@example.com',
		note: 'This is a note.',
		faPDF: true,
		faCSV: false,
		dlPDF: false,
		dlCSV: true,
		azSvoz: true,
		azExpedice: false
	},
	{
		default: true,
		active: true,
		name: 'Jane',
		lastName: 'Smith',
		phoneNumber: '+420 987 654 321',
		pevnaLinka: '',
		email: 'janesmith@example.com',
		note: '',
		faPDF: false,
		faCSV: true,
		dlPDF: true,
		dlCSV: false,
		azSvoz: false,
		azExpedice: true
	},
	{
		default: false,
		active: false,
		name: 'Michael',
		lastName: 'Johnson',
		phoneNumber: '+420 555 555 555',
		pevnaLinka: '+420 111 111 111',
		email: 'michaeljohnson@example.com',
		note: 'A new contact.',
		faPDF: true,
		faCSV: true,
		dlPDF: true,
		dlCSV: true,
		azSvoz: false,
		azExpedice: false
	}
];
