<template>
    <div>
        <i class="el-icon-setting drawer-settings" @click="drawer = true"></i>
        <el-drawer title="配置设置" :visible.sync="drawer">
            <div class="drawer-content">
                <h5>语言设置</h5>
                <el-switch
                    active-text="中文"
                    inactive-text="英文"
                    v-model="text"
                ></el-switch>
                <h5>主题更换</h5>
                <el-radio v-model="color" label="dark"
                    >黑色 <span class="dark"></span
                ></el-radio>
                <el-radio v-model="color" label="blue"
                    >蓝色 <span class="blue"></span
                ></el-radio>
                <el-button @click="save">保存设置</el-button>
            </div>
        </el-drawer>
    </div>
</template>

<script>
export default {
    data() {
        return {
            drawer: false,
            color: 'blue',
            text: '',
        };
    },
    methods: {
        save() {
            this.$emit('my_set', {
                text: this.text,
                color: this.color,
            });
        },
    },
};
</script>

<style lang="css" scoped>
.drawer-settings {
    position: fixed;
    padding: 15px;
    top: 40%;
    z-index: 10000;
    right: 0;
    background: #409eff;
    font-size: 20px;
    color: #fff;
    border-radius: 5px 0 0 5px;
    cursor: pointer;
}
.drawer-content {
    margin: 15px;
}
</style>
