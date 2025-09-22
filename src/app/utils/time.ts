// simple utilities - no external deps
export const parseDate = (yyyyMmDd: string): Date => {
	// interpret as local date in server timezone; constructing like this
	const [y, m, d] = yyyyMmDd.split("-").map(Number);
	if (
		typeof y !== "number" ||
		isNaN(y) ||
		typeof m !== "number" ||
		isNaN(m) ||
		typeof d !== "number" ||
		isNaN(d)
	) {
		throw new Error(`Invalid date string: ${yyyyMmDd}`);
	}
	return new Date(y, m - 1, d, 0, 0, 0, 0);
};

export const combineDateTime = (dateStr: string, timeStr: string): Date => {
	// dateStr: YYYY-MM-DD, timeStr: HH:mm
	const [y, mo, d] = dateStr.split("-").map(Number);
	const [hh, mm] = timeStr.split(":").map(Number);

	if (
		typeof y !== "number" ||
		isNaN(y) ||
		typeof mo !== "number" ||
		isNaN(mo) ||
		typeof d !== "number" ||
		isNaN(d) ||
		typeof hh !== "number" ||
		isNaN(hh) ||
		typeof mm !== "number" ||
		isNaN(mm)
	) {
		throw new Error(`Invalid date or time string: ${dateStr} ${timeStr}`);
	}

	return new Date(y, mo - 1, d, hh, mm, 0, 0);
};

export const diffMinutes = (a: Date, b: Date): number => {
	return Math.round((b.getTime() - a.getTime()) / 60000);
};

export const addMinutes = (d: Date, minutes: number): Date => {
	return new Date(d.getTime() + minutes * 60000);
};

export const iterateDatesInclusive = (startDateStr: string, endDateStr: string): string[] => {
	const result: string[] = [];
	const start = parseDate(startDateStr);
	const end = parseDate(endDateStr);
	for (let cur = new Date(start); cur <= end; cur.setDate(cur.getDate() + 1)) {
		const yyyy = cur.getFullYear();
		const mm = String(cur.getMonth() + 1).padStart(2, "0");
		const dd = String(cur.getDate()).padStart(2, "0");
		result.push(`${yyyy}-${mm}-${dd}`);
	}
	return result;
};
