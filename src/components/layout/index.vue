<template>
    <el-container class="layout-container">
        <el-aside width="200px">
            <keep-alive>
                <Aside></Aside>
            </keep-alive>
        </el-aside>
        <el-container>
            <el-header style="padding: 0;">
                <Header></Header>
            </el-header>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>
<script lang="ts" setup>
import Aside from "./components/Aside.vue"
import Header from "./components/Header.vue"
</script>
<style lang="scss" scope>
.layout-container {
    width: 100%;
    height: 100vh;

    .el-container {
        .el-main {
            padding: 0;
        }
    }
}
</style>