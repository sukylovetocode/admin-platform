<template>
    <div :class="cssClasses" class="calendar_event">
        <span @click="handleClick">{{ item.title }}</span>
    </div>
</template>

<script>
export default {
    props: {
        item: Object,
    },
    computed: {
        cssClasses() {
            let myClasses = [];
            let statusClass = this.getStatusClass(this.item.status);
            myClasses.push(statusClass);
            return myClasses;
        },
    },
    methods: {
        handleClick() {
            this.$emit('SELECT', this.item);
        },
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
    box-sizing: border-box;
    cursor: pointer;
    margin: 5px 0;
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
