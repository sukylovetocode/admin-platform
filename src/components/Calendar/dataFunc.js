export function today() {
    let now = new Date();
    let nowDate = now.getDate(); //日
    let nowYear = now.getFullYear(); // 年
    let nowMon = now.getMonth(); // 月init month
    let nowActMon = nowMon + 1;
    let nowDay = now.getDay(); // 星期几
    return {
        now,
        nowDate,
        nowYear,
        nowMon,
        nowActMon,
        nowDay,
    };
}

export function getWeekCh(index) {
    let weekCh = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
    return weekCh[index];
}

export function getMonthCh(index) {
    let monthCh = [
        '一月',
        '二月',
        '三月',
        '四月',
        '五月',
        '六月',
        '七月',
        '八月',
        '九月',
        '十月',
        '十一月',
        '十二月',
    ];
    return monthCh[index];
}

export function getDayCh(index) {
    let dayCh = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
    return dayCh[index];
}

export function getMonthBeau(mon) {
    let a = mon + 1;
    if (a < 10) {
        a = '0' + a;
    }
    return a;
}

export function getHours(timestramp) {
    return new Date(timestramp).getHours();
}

export function getTimestamp(year, month, date) {
    return new Date(year, month, date).getTime();
}

export function getDay(timestramp) {
    return new Date(timestramp).getDay();
}

export function getFullYear(timestramp) {
    return new Date(timestramp).getFullYear();
}

export function getMonth(timestramp) {
    return new Date(timestramp).getMonth();
}

export function getDate(timestramp) {
    return new Date(timestramp).getDate();
}

export const DAY_TIME = 24 * 60 * 60 * 1000;

export function isSameDate(item) {
    let { nowYear, nowMon, nowDate } = today();

    return (
        item.year === nowYear && item.mon === nowMon && item.date === nowDate
    );
}

export function getOnlyDateTimestrap(date) {
    let thisDa = new Date(date);
    let thisYear = thisDa.getFullYear();
    let thisMon = thisDa.getMonth();
    let thisDate = thisDa.getDate();
    return getTimestamp(thisYear, thisMon, thisDate);
}
