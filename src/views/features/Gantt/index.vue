<template>
    <div>
        <gantt class="container" :tasks="tasks"></gantt>
    </div>
</template>

<script>
import Gantt from '@/components/Gantt/index';

export default {
    name: 'HelloWorld',
    components: {
        Gantt,
    },
    data() {
        return {
            tasks: {
                data: [
                    {
                        id: 1,
                        text: 'Task #1',
                        start_date: '14-01-2021',
                        duration: 3,
                        progress: 0.6,
                    },
                    {
                        id: 2,
                        text: 'Task #2',
                        start_date: '20-01-2021',
                        duration: 3,
                        progress: 0.4,
                    },
                ],
                links: [],
            },
        };
    },
};
</script>

<style scoped lang="scss">
.container {
    width: 100%;
    height: 800px;
}
</style>
