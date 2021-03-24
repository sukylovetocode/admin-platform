<template>
    <div class="attr-wrapper">
        <h4 class="attr-title">属性区域</h4>
        <el-form v-if="item">
            <el-form-item v-if="item.hasOwnProperty('propVal')" label="内容">
                <el-input type="textarea" v-model="item.propVal"></el-input>
            </el-form-item>
            <el-form-item
                v-if="item.hasOwnProperty('propImg')"
                label="图片链接"
            >
                <el-input type="input" v-model="item.propImg"></el-input>
            </el-form-item>
            <el-form-item
                v-for="(child, index) in Object.keys(item.style)"
                :key="index"
                :label="styleName[child]"
            >
                <el-input type="number" v-model="item.style[child]"></el-input>
            </el-form-item>
        </el-form>
        <div v-else class="no-item">暂无选中元素</div>
    </div>
</template>

<script>
export default {
    props: {
        item: Object,
    },
    data() {
        return {
            styleName: {
                width: '宽度',
                height: '高度',
                zIndex: '层级',
                left: '左侧距离',
                top: '右侧距离',
            },
        };
    },
};
</script>

<style lang="scss">
.attr-wrapper {
    margin: 0 10px;
    .attr-title {
        font-size: 20px;
        font-weight: 800;
    }
    .no-item {
        margin: 10px 0;
        font-size: 14px;
    }
}
</style>
