import type { DateRangeActions } from '$lib/types/input-dialog/inputDialog';

export function getDatesByAction(action: DateRangeActions) {

	if (action === 'lastYearFull') {
		console.log(new Date(new Date().getFullYear() - 1, 0, 1));
		console.log(new Date(new Date().getFullYear() - 1, 11, 31));
	}

	if (action === 'thisYearFull') {
		console.log(new Date(new Date().getFullYear(), 0, 1));
		console.log(new Date(new Date().getFullYear(), 11, 31));
	}

	if (action === 'last365') {
		const yearAgo = new Date();
		yearAgo.setFullYear(yearAgo.getFullYear() - 1);
		console.log(yearAgo);
		console.log(new Date());
	}

	if (action === 'thisYear') {
		console.log(new Date(new Date().getFullYear(), 0, 1));
		console.log(new Date());
	}

	if (action === 'lastMonthFull') {
		const today = new Date();
		const prevMonth = today.getMonth() - 1;
		const prevYear = (prevMonth === -1) ? today.getFullYear() - 1 : today.getFullYear();
		const firstDay = new Date(prevYear, prevMonth, 1);
		const lastDay = new Date(prevYear, prevMonth + 1, 0);
		console.log(firstDay);
		console.log(lastDay);
	}

	if (action === 'thisMonthFull') {
		const today = new Date();
		const month = today.getMonth();
		const year = today.getFullYear();
		const firstDay = new Date(year, month, 1);
		const lastDay = new Date(year, month + 1, 0);
		console.log(firstDay);
		console.log(lastDay);
	}


	if (action === 'thisMonth') {
		const today = new Date();
		const month = today.getMonth();
		const year = today.getFullYear();
		const firstDay = new Date(year, month, 1);
		console.log(firstDay);
		console.log(new Date());
	}

	if (action === 'last14') {
		const twoWeeksAgo = new Date();
		twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);
		console.log(twoWeeksAgo);
		console.log(new Date());
	}

	if (action === 'lastWeek') {
		const twoWeeksAgo = new Date();
		twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 7);
		console.log(twoWeeksAgo);
		console.log(new Date());
	}

	if (action === 'thisWeek') {
		const today = new Date();
		let day = today.getDay();
		const diff = day === 0 ? 7 : day;
		today.setDate(today.getDate() - diff + 1);
		console.log(today);
		console.log(new Date());
	}
}
