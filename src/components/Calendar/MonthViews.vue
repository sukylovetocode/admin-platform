<template>
    <div>
        <el-row>
            <el-col :span="4">
                <div class="calendar_notice">
                    <h3>事件分类</h3>
                    <div>
                        <span class="rect urgent"></span>
                        紧急重要
                    </div>
                    <div>
                        <span class="rect import"></span>
                        重要不紧急
                    </div>
                    <div>
                        <span class="rect quick"></span>
                        紧急不重要
                    </div>
                    <div>
                        <span class="rect normal"></span>
                        不紧急不重要
                    </div>
                </div>
                <div class="calendar_detail" v-if="curCalendarDetail.end">
                    <h3>事件详情</h3>
                    <div class="calendar_detail_content">
                        开始时间:
                        <div class="calendar_detail_content_start">
                            {{ curCalendarDetail.start }}
                        </div>
                        结束时间:
                        <div class="calendar_detail_content_end">
                            {{ curCalendarDetail.end }}
                        </div>
                        内容：
                        <div class="calendar_detail_content_title">
                            {{ curCalendarDetail.title }}
                        </div>
                    </div>
                </div>
            </el-col>
            <el-col :span="18">
                <div class="calendar_views">
                    <div class="calendar_head">
                        <span class="calendar_head_left">
                            {{ getMonthCh(curMon) }}{{ curYear }}
                        </span>
                        <span class="calendar_head_right">
                            <i class="el-icon-back" @click="handlePrevMon"></i>
                            <i class="el-icon-right" @click="handleNextMon"></i>
                        </span>
                    </div>
                    <div class="calendar_content">
                        <div
                            v-for="(item, index) in calendarDates"
                            :key="index"
                            class="calendar_content_item"
                        >
                            <span
                                class="calendar_content_date"
                                :class="isSameDate(item) ? 'isCurrentDay' : ''"
                                >{{ item.date }}</span
                            >
                            <span
                                class="calendar_content_day"
                                v-if="Math.floor(index / 7) === 0"
                                >{{ getWeekCh(index) }}</span
                            >
                            <div class="calendar_events">
                                <event-card
                                    :item="child"
                                    v-for="(child, idx) in item.events"
                                    :key="idx"
                                    :date_timestrap="item.timestramp"
                                    @SELECT="handleSelect"
                                ></event-card>
                            </div>
                        </div>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import {
    today,
    getTimestamp,
    getDay,
    getFullYear,
    getMonth,
    getDate,
    getWeekCh,
    getMonthCh,
    DAY_TIME,
    isSameDate,
} from './dataFunc';
import EventCard from './EventCard.vue';
export default {
    components: { EventCard },
    data() {
        return {
            calendarDates: [],
            curMon: '',
            curYear: '',
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
            curCalendarDetail: {},
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
        };
    },
    created() {
        this.initCalendar();
    },
    methods: {
        getWeekCh,
        getMonthCh,
        isSameDate,
        getDayEvents(timestramp) {
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
        cycleDates(curYear, curMon, curDate) {
            let arr = [];
            // js中周日-周六就是0-6这样排序

            // 计算当月第一天时间戳
            let firstTime = getTimestamp(curYear, curMon, curDate);
            // 计算表格开头的时间戳
            let startTime = firstTime - getDay(firstTime) * DAY_TIME;

            // 遍历产生所有日期
            for (let i = 0; i < 42; i++) {
                let i_timestramp = startTime + i * DAY_TIME;
                arr.push({
                    timestramp: i_timestramp,
                    day: getDay(i_timestramp),
                    date: getDate(i_timestramp),
                    mon: getMonth(i_timestramp),
                    year: getFullYear(i_timestramp),
                    events: this.getDayEvents(i_timestramp),
                });
            }
            return arr;
        },
        initCalendar() {
            // today
            let { nowYear, nowMon } = today();
            // 设置开始日期
            this.curMon = nowMon;
            this.curYear = nowYear;

            this.calendarDates = this.cycleDates(nowYear, nowMon, 1);
        },
        handlePrevMon() {
            this.curMon = this.curMon - 1;
            // 到0就是今年没开始，要往上一年
            if (this.curMon === -1) {
                this.curMon = 11;
                this.curYear = this.curYear - 1;
            }
            this.calendarDates = this.cycleDates(this.curYear, this.curMon, 1);
        },
        handleNextMon() {
            this.curMon = this.curMon + 1;
            // 到0就是今年没开始，要往上一年
            if (this.curMon === 12) {
                this.curMon = 0;
                this.curYear = this.curYear + 1;
            }
            this.calendarDates = this.cycleDates(this.curYear, this.curMon, 1);
        },
        handleSelect(item) {
            this.curCalendarDetail = item;
        },
    },
};
</script>

<style lang="css" scoped>
.calendar_views {
    width: 1050px;
}
.calendar_head {
    border: 1px solid #ebebeb;
    height: 60px;
    width: 100%;
    border-radius: 0 5px 0 0;
    box-sizing: border-box;
}
.calendar_head_left {
    display: inline-block;
    line-height: 60px;
    font-size: 20px;
    font-weight: 600;
    padding: 0 10px;
}
.calendar_head_right {
    float: right;
    line-height: 60px;
    margin-right: 10px;
}
.calendar_head_right i {
    background: #f8f7f7;
    border: 1px solid #ebebeb;
    border-radius: 5px;
    padding: 10px;
    margin-right: 10px;
}
.calendar_content {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
}
.calendar_content_item {
    list-style: none;
    width: 150px;
    height: 150px;
    border: 1px solid #ebebeb;
    box-sizing: border-box;
    position: relative;
}
.calendar_content_date {
    padding: 5px;
    font-weight: 600;
    display: inline-block;
}
.calendar_content_day {
    position: absolute;
    right: 8px;
    font-size: 12px;
    top: 5px;
    color: #666;
}
.isCurrentDay {
    color: #fff;
    display: block;
    color: #fff;
    background: #000;
    width: 20px;
    height: 20px;
    top: 0;
    left: 0;
    font-weight: 400;
    text-align: center;
    border-radius: 50%;
    position: absolute;
}
.calendar_events {
    width: 100%;
    height: auto;
}
.rect {
    width: 20px;
    height: 10px;
    display: inline-block;
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
.calendar_detail {
    margin-top: 20px;
}
.calendar_detail_content {
    margin-top: 10px;
    border: 1px solid #ebebeb;
    border-radius: 8px;
    width: 85%;
    min-height: 150px;
    background: rgb(218, 218, 218);
    padding: 5px;
}
.calendar_detail_content_start {
    font-size: 20px;
    font-weight: 600;
}
</style>
