<template>
    <div>
        <h3>mixin尝试</h3>
        <el-button @click="modalShow = true">点击显示</el-button>
        <modal-wrap :show="modalShow">
            <template v-slot:content>
                <div class="pop">
                    这是遮罩要显示的东西
                    <el-button @click="modalShow = false">关闭</el-button>
                </div>
            </template>
        </modal-wrap>
    </div>
</template>

<script>
import ModalWrap from './modalWrap';

export default {
    data() {
        return {
            modalShow: false,
        };
    },
    components: {
        ModalWrap,
    },
};
</script>
