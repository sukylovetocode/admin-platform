<template>
    <div class="calendar_views">
        <div class="calendar_title" v-if="calendarArr.length > 0">
            <i class="el-icon-arrow-left" @click="handlePrevWeek"></i>
            {{ getMonthBeau(calendarArr[0].mon) + '-' + calendarArr[0].date }}
            至
            {{ getMonthBeau(calendarArr[6].mon) + '-' + calendarArr[6].date }}
            <i class="el-icon-arrow-right" @click="handleNextWeek"></i>
        </div>
        <div class="calendar_head">
            <div
                class="calendar_head_item"
                v-for="(item, index) in calendarArr"
                :key="index"
            >
                {{
                    getDayCh(item.day) +
                        '(' +
                        getMonthBeau(item.mon) +
                        '-' +
                        item.date +
                        ')'
                }}
            </div>
        </div>
        <div class="calendar_content">
            <div
                class="calendar_time"
                v-for="(item, index) in timeDivide"
                :key="index"
            >
                <div class="calendar_time_title">{{ item.label }}</div>
                <div
                    class="calendar_time_item"
                    v-for="(child, idx) in calendarArr"
                    :key="idx"
                >
                    <div class="calendar_events">
                        <week-card
                            :item="a"
                            v-for="(a, i) in getDivideEvents(child, item)"
                            :key="i"
                        ></week-card>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {
    today,
    getTimestamp,
    DAY_TIME,
    getMonth,
    getDate,
    getDay,
    getDayCh,
    getMonthBeau,
    getFullYear,
    getHours,
} from './dataFunc';
import WeekCard from './weekCard';
export default {
    components: { WeekCard },
    data() {
        return {
            timeDivide: [
                {
                    start: 0,
                    end: 12,
                    label: '上午',
                },
                {
                    start: 12,
                    end: 18,
                    label: '下午',
                },
                {
                    start: 18,
                    end: 24,
                    label: '晚上',
                },
            ],
            events: [
                // status 0 紧急重要 1 紧急不重要 2 重要不紧急 3 不重要不紧急
                {
                    start: '2021-03-10 19:30:00',
                    end: '2021-03-12 03:15:00',
                    id: '1',
                    title:
                        '这里有一件重要的事情这里有一件重要的事情这里有一件重要的事情这里有一件重要的事情',
                    status: 0,
                    name: '黎',
                },
                {
                    start: '2021-03-10 19:30:00',
                    end: '2021-03-12 03:15:00',
                    id: '2',
                    title:
                        '这里有一件重要的事情这里有一件重要的事情这里有一件重要的事情这里有一件重要的事情',
                    status: 0,
                    name: '黎',
                },
                {
                    start: '2021-03-10 19:30:00',
                    end: '2021-03-12 03:15:00',
                    id: '3',
                    title:
                        '这里有一件重要的事情这里有一件重要的事情这里有一件重要的事情这里有一件重要的事情',
                    status: 0,
                    name: '黎',
                },
            ],
            calendarArr: [],
            curTimestramp: 0,
        };
    },
    mounted() {
        this.initCalendar();
    },
    methods: {
        getDayCh,
        getMonthBeau,
        cycleDates() {
            let arr = [];
            // js中周日-周六就是0-6这样排序
            // 计算表格开头的时间戳
            let startTime =
                this.curTimestramp - getDay(this.curTimestramp) * DAY_TIME;

            // 遍历产生所有日期
            for (let i = 0; i < 7; i++) {
                let timestramp = startTime + i * DAY_TIME;
                arr.push({
                    timestramp: timestramp,
                    date: getDate(timestramp),
                    mon: getMonth(timestramp),
                    day: getDay(timestramp),
                    events: this.getTimeEvents(timestramp),
                });
            }
            return arr;
        },
        initCalendar() {
            // today
            let { nowYear, nowMon, nowDate } = today();
            // 设置开始日期
            this.curTimestramp = getTimestamp(nowYear, nowMon, nowDate);

            this.calendarArr = this.cycleDates();
        },
        getTimeEvents(timestramp) {
            let dayEvents = [];
            let nowDate = getDate(timestramp);
            let nowMon = getMonth(timestramp);
            let nowYear = getFullYear(timestramp);
            this.events.map((event) => {
                let startDate = new Date(event.start).getDate();
                let startYear = new Date(event.start).getFullYear();
                let startMon = new Date(event.start).getMonth();
                if (
                    startDate === nowDate &&
                    startYear === nowYear &&
                    startMon === nowMon
                ) {
                    dayEvents.push(event);
                }
            });
            return dayEvents;
        },
        getDivideEvents(item, divide) {
            let b = [];
            if (divide.start === 0) {
                item.events.map((a) => {
                    let startTime = getHours(new Date(a.start).getTime());
                    if (startTime >= 0 && startTime < 12) {
                        b.push(a);
                    }
                });
            } else if (divide.start === 12) {
                item.events.map((a) => {
                    let startTime = getHours(new Date(a.start).getTime());
                    if (startTime >= 12 && startTime < 18) {
                        b.push(a);
                    }
                });
            } else {
                item.events.map((a) => {
                    let startTime = getHours(new Date(a.start).getTime());
                    if (startTime >= 18) {
                        b.push(a);
                    }
                });
            }
            return b;
        },
        handlePrevWeek() {
            this.curTimestramp -= 7 * DAY_TIME;
            this.calendarArr = this.cycleDates();
        },
        handleNextWeek() {
            this.curTimestramp += 7 * DAY_TIME;
            this.calendarArr = this.cycleDates();
        },
    },
};
</script>

<style scoped lang="css">
.calendar_views {
    width: 1430px;
    box-sizing: border-box;
}
.calendar_title {
    border: 1px solid #ebebeb;
    padding: 5px;
    border-radius: 5px 5px 0 0;
    text-align: center;
}
.calendar_title i {
    cursor: pointer;
}
.calendar_head {
    display: flex;
    flex-wrap: nowrap;
    justify-content: center;
    border-left: 1px solid #ebebeb;
    border-right: 1px solid #ebebeb;
    box-sizing: border-box;
}
.calendar_head_item {
    width: 200px;
    text-align: center;
    line-height: 40px;
    box-sizing: border-box;
}
.calendar_time {
    display: flex;
    box-sizing: border-box;
}
.calendar_time_title {
    width: 30px;
    border: 1px solid #ebebeb;
    line-height: 148px;
    text-align: center;
    box-sizing: border-box;
}
.calendar_time_item {
    width: 200px;
    height: 300px;
    border: 1px solid #ebebeb;
    box-sizing: border-box;
}
.calendar_events {
    width: 100%;
    height: auto;
    box-sizing: border-box;
}
.urgent {
    background: rgba(241, 147, 156, 0.5);
}
.import {
    background: rgb(183, 116, 238, 0.4);
}
.quick {
    background: rgb(126, 241, 132, 0.4);
}
.normal {
    background: #666;
}
</style>
