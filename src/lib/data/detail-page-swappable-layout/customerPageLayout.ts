import { v4 as uuidv4 } from 'uuid';

export const customerPageLayout = [
	{
		id: uuidv4(),
		type: "form",
		isLast: false,
	},
	{
		id: uuidv4(),
		type: "contacts",
		isLast: true,
	},
];
