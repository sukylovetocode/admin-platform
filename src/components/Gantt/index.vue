<template>
    <div ref="gantt"></div>
</template>

<script>
import { gantt } from 'dhtmlx-gantt';
import 'dhtmlx-gantt/codebase/dhtmlxgantt.css';

export default {
    name: 'Gantt',
    props: {
        tasks: {
            type: Object,
            default() {
                return {
                    data: [],
                    links: [],
                };
            },
        },
    },
    mounted() {
        //   禁止浏览器滚动
        var scrollFunc = function(e) {
            e = e || window.event;
            if (e.wheelDelta && e.ctrlKey) {
                //IE/Opera/Chrome
                e.returnValue = false;
            } else if (e.detail) {
                //Firefox
                e.returnValue = false;
            }
        }; /*注册事件*/
        if (document.addEventListener) {
            document.addEventListener('DOMMouseScroll', scrollFunc, false);
        } //W3C
        window.onmousewheel = document.onmousewheel = scrollFunc; //IE/Opera/Chrome/Safari

        gantt.i18n.setLocale('cn');

        // 自定义表格列
        gantt.config.columns = [
            {
                name: 'text', // 有几种值：text start_date duration add
                label: '事件',
                width: 250,
                tree: true, // 是否允许我们进行父子节点排列
                template: function(obj) {
                    return `${obj.text}`;
                },
            },
            {
                name: 'add',
            },
        ];

        gantt.plugins({
            tooltip: true,
            drag_timeline: true,
        });

        // 多层日期展示
        gantt.config.scale_height = 80; // 自定义顶部的高度
        gantt.config.scales = [
            { unit: 'day', step: 1, format: '%d' },
            { unit: 'month', step: 1, format: '%F, %Y' },
            { unit: 'year', step: 1, format: '%Y' },
        ];

        // 设置缩放
        gantt.config.min_column_width = 30;
        var zoomConfig = {
            minColumnWidth: 30,
            maxColumnWidth: 100,
            levels: [
                [
                    { unit: 'year', format: '%M %Y', step: 1 },
                    { unit: 'month', format: '%M', step: 1 },
                ],
                [
                    { unit: 'year', step: 1, format: '%Y' },
                    { unit: 'month', format: '%M %Y', step: 1 },
                    { unit: 'day', format: '%d %M', step: 1 },
                ],
            ],
            useKey: 'ctrlKey',
            trigger: 'wheel',
            element: function() {
                return gantt.$root.querySelector('.gantt_task');
            },
        };

        // 初始化
        gantt.ext.zoom.init(zoomConfig);

        // 自定义我们想要的tooltip内容
        gantt.templates.tooltip_text = function(startDate, endDate, task) {
            const dom = gantt;
            const tipsContent = `
                <b>事件：</b> ${task.text} <br/>
                <b>计划开始事件：</b> ${dom.templates.tooltip_date_format(
                    startDate
                )} <br/>
                <b>计划结束时间：</b> ${dom.templates.tooltip_date_format(
                    endDate
                )} <br/>
                <b>持续时间：</b> ${task.duration} <br/>
                <b>目前进度：</b> ${task.progress * 100 + '%'} <br/>
            `;
            return tipsContent;
        };

        gantt.init(this.$refs.gantt);
        gantt.parse(this.$props.tasks);
        gantt.attachEvent('onTaskDrag', function(id, mode, task, original) {
            console.log(id, mode, task, original);
        });
    },
};
</script>
