<template>
    <div
        class="calendar_event"
        :class="cssClasses"
        :style="{ width: gap * 100 + '%' }"
    >
        <span v-if="showTitle" @click="handleClick">{{ item.title }}</span>
    </div>
</template>

<script>
import { getOnlyDateTimestrap, DAY_TIME } from './dataFunc';
export default {
    props: {
        item: Object,
        date_timestrap: Number,
    },
    computed: {
        cssClasses() {
            let myClasses = [];
            let statusClass = this.getStatusClass(this.item.status);
            myClasses.push(statusClass);
            return myClasses;
        },
        showTitle() {
            let a = false;
            if (getOnlyDateTimestrap(this.item.start) === this.date_timestrap) {
                a = true;
            }
            return a;
        },
        gap() {
            // 计算开始以及结束日期的长度
            let gap =
                getOnlyDateTimestrap(this.item.end) -
                getOnlyDateTimestrap(this.item.start);
            let gapDay = gap / DAY_TIME;
            return gapDay;
        },
    },
    methods: {
        getStatusClass(status) {
            let statusClass;
            switch (status) {
                case 0:
                    statusClass = 'urgent';
                    break;
                case 1:
                    statusClass = 'import';
                    break;
                case 2:
                    statusClass = 'quick';
                    break;
                case 3:
                    statusClass = 'normal';
                    break;
                default:
                    statusClass = 'normal';
            }
            return statusClass;
        },
        handleClick() {
            this.$emit('SELECT', this.item);
        },
    },
};
</script>

<style lang="css" scoped>
.calendar_event {
    font-size: 12px;
    width: 100%;
    height: 30px;
    position: relative;
    border-radius: 8px;
    z-index: 100;
    margin: 5px 2px;
    box-sizing: border-box;
    cursor: pointer;
}
.calendar_event span {
    width: 100%;
    display: inline-block;
    padding: 0 10px;
    line-height: 30px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    box-sizing: border-box;
}
</style>
