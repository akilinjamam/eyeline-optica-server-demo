"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.iterateDatesInclusive = exports.addMinutes = exports.diffMinutes = exports.combineDateTime = exports.parseDate = void 0;
// simple utilities - no external deps
const parseDate = (yyyyMmDd) => {
    // interpret as local date in server timezone; constructing like this
    const [y, m, d] = yyyyMmDd.split("-").map(Number);
    if (typeof y !== "number" ||
        isNaN(y) ||
        typeof m !== "number" ||
        isNaN(m) ||
        typeof d !== "number" ||
        isNaN(d)) {
        throw new Error(`Invalid date string: ${yyyyMmDd}`);
    }
    return new Date(y, m - 1, d, 0, 0, 0, 0);
};
exports.parseDate = parseDate;
const combineDateTime = (dateStr, timeStr) => {
    // dateStr: YYYY-MM-DD, timeStr: HH:mm
    const [y, mo, d] = dateStr.split("-").map(Number);
    const [hh, mm] = timeStr.split(":").map(Number);
    if (typeof y !== "number" ||
        isNaN(y) ||
        typeof mo !== "number" ||
        isNaN(mo) ||
        typeof d !== "number" ||
        isNaN(d) ||
        typeof hh !== "number" ||
        isNaN(hh) ||
        typeof mm !== "number" ||
        isNaN(mm)) {
        throw new Error(`Invalid date or time string: ${dateStr} ${timeStr}`);
    }
    return new Date(y, mo - 1, d, hh, mm, 0, 0);
};
exports.combineDateTime = combineDateTime;
const diffMinutes = (a, b) => {
    return Math.round((b.getTime() - a.getTime()) / 60000);
};
exports.diffMinutes = diffMinutes;
const addMinutes = (d, minutes) => {
    return new Date(d.getTime() + minutes * 60000);
};
exports.addMinutes = addMinutes;
const iterateDatesInclusive = (startDateStr, endDateStr) => {
    const result = [];
    const start = (0, exports.parseDate)(startDateStr);
    const end = (0, exports.parseDate)(endDateStr);
    for (let cur = new Date(start); cur <= end; cur.setDate(cur.getDate() + 1)) {
        const yyyy = cur.getFullYear();
        const mm = String(cur.getMonth() + 1).padStart(2, "0");
        const dd = String(cur.getDate()).padStart(2, "0");
        result.push(`${yyyy}-${mm}-${dd}`);
    }
    return result;
};
exports.iterateDatesInclusive = iterateDatesInclusive;
//# sourceMappingURL=time.js.map