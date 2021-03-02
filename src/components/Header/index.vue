<template>
    <div class="my_header">
        <div class="header_logo"><i class="el-icon-eleme"></i>商标</div>
        <top-menu></top-menu>
        <div class="header_right">
            <el-dropdown trigger="click" class="header_settings">
                <span>
                    <el-avatar size="medium"></el-avatar>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>
                        退出登录
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            <div class="header_search"><el-input></el-input></div>
        </div>
    </div>
</template>
<script>
import TopMenu from '@/components/TopMenu/index';
export default {
    components: {
        TopMenu,
    },
};
</script>

<style lang="css">
.my_header {
    display: flex;
    align-items: center;
    border-bottom: solid 1px #e6e6e6;
}
.header_logo {
    font-size: 22px;
    color: #409eff;
    padding-right: 30px;
}
.header_right {
    flex-grow: 1;
}
.header_search {
    float: right;
    padding: 10px;
}
.header_settings {
    float: right;
    padding: 10px;
}
</style>
