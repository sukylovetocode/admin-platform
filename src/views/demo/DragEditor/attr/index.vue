<template>
    <div>
        <el-form v-if="item">
            <el-form-item v-if="item.propVal" label="内容">
                <el-input type="textarea" v-model="item.propVal"></el-input>
            </el-form-item>
            <el-form-item
                v-for="(child, index) in Object.keys(item.style)"
                :key="index"
                :label="child"
            >
                <el-input type="number" v-model="item.style[child]"></el-input>
            </el-form-item>
            <el-button>确认修改</el-button>
        </el-form>
    </div>
</template>

<script>
export default {
    props: {
        item: Object,
    },
    mounted() {
        console.log(this.item);
    },
    updated() {
        console.log(this.item);
    },
};
</script>
