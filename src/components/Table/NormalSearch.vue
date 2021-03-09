<template>
    <el-form ref="form" :model="form" label-width="80px" :inline="true">
        <el-form-item
            v-for="(item, index) in searchType"
            :key="index"
            :label="item.title"
        >
            <el-input
                v-if="item.type === 'input'"
                v-model="form[item.name]"
                @change="handleChange"
            ></el-input>
            <el-select
                v-if="item.type === 'dropdown'"
                v-model="form[item.name]"
                placeholder="请选择"
                @change="handleChange"
            >
                <el-option
                    :label="child.label"
                    :value="child.value"
                    v-for="(child, idx) in item.options"
                    :key="idx"
                ></el-option>
            </el-select>
        </el-form-item>
        <el-form-item v-if="needClick">
            <el-button @click="handleSubmit">检索</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
export default {
    props: {
        needClick: Boolean,
        searchType: Array,
    },
    data() {
        return {
            form: this.initForm(),
        };
    },
    methods: {
        initForm() {
            let form = {};
            this.searchType.forEach((item) => {
                form[item.name] = '';
            });
            return form;
        },
        handleChange() {
            if (!this.needClick) {
                this.$emit('SEARCH', this.form);
            }
        },
        handleSubmit() {
            this.$emit('SEARCH', this.form);
        },
    },
};
</script>
