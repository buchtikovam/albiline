import type { DialogDateRange } from '$lib/types/input-dialog/inputDialog';

export function getDatesByAction(
	action,
	item: DialogDateRange
) {

	// if (action === 'thisYearFull') {
	// 	startDateValue= new Date(new Date().getFullYear(), 0, 1);
	// 	endDateValue = new Date(new Date().getFullYear(), 11, 31);
	// }

	if (action === 'last365') {
		const yearAgo = new Date();
		yearAgo.setFullYear(yearAgo.getFullYear() - 1);
		item.startDateValue = yearAgo;
		item.endDateValue = new Date();
	}


	// if (action === 'thisYear') {
	// 	startDateValue = new Date(new Date().getFullYear(), 0, 1);
	// 	endDateValue = new Date();
	// }
	//
	// if (action === 'lastMonthFull') {
	// 	const today = new Date();
	// 	const prevMonth = today.getMonth() - 1;
	// 	const prevYear = (prevMonth === -1) ? today.getFullYear() - 1 : today.getFullYear();
	// 	startDateValue = new Date(prevYear, prevMonth, 1);
	// 	endDateValue = new Date(prevYear, prevMonth + 1, 0);
	// }
	//
	// if (action === 'thisMonthFull') {
	// 	const today = new Date();
	// 	const month = today.getMonth();
	// 	const year = today.getFullYear();
	// 	startDateValue = new Date(year, month, 1);
	// 	endDateValue = new Date(year, month + 1, 0);
	// }
	//
	//
	// if (action === 'thisMonth') {
	// 	const today = new Date();
	// 	const month = today.getMonth();
	// 	const year = today.getFullYear();
	// 	startDateValue = new Date(year, month, 1);
	// 	endDateValue = new Date();
	// }
	//
	// if (action === 'last14') {
	// 	const twoWeeksAgo = new Date();
	// 	twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);
	// 	startDateValue = twoWeeksAgo;
	// 	endDateValue = new Date();
	// }
	//
	// if (action === 'lastWeek') {
	// 	const twoWeeksAgo = new Date();
	// 	twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 7);
	// 	startDateValue= twoWeeksAgo;
	// 	endDateValue = new Date();
	// }
	//
	// if (action === 'thisWeek') {
	// 	const today = new Date();
	// 	let day = today.getDay();
	// 	const diff = day === 0 ? 7 : day;
	// 	today.setDate(today.getDate() - diff + 1);
	// 	startDateValue = today;
	// 	endDateValue = new Date();
	// }

	return item
}
