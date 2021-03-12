<template>
    <div>
        <el-switch
            v-model="viewType"
            active-text="月视图"
            inactive-text="周视图"
        ></el-switch>
        <month-views v-if="viewType"></month-views>
        <week-views v-else></week-views>
    </div>
</template>

<script>
import MonthViews from '@/components/Calendar/MonthViews.vue';
import WeekViews from '@/components/Calendar/WeekViews.vue';
export default {
    data() {
        return {
            viewType: false,
        };
    },
    components: {
        MonthViews,
        WeekViews,
    },
};
</script>
