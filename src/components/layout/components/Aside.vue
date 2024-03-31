<template>
    <el-row class="aside-container">
        <el-col :span="24">
            <div class="aside-logo">
                Null-More
            </div>
            <el-menu active-text-color="#ffd04b" background-color="#545c64" class="aside-container-menu-block"
                text-color="#fff" @open="handleOpen" @close="handleClose" @select="handleSelect">
                <el-sub-menu v-for="(menu, index) in menus" :key="index" :index="menu.name">
                    <template #title>
                        <!-- <el-icon>
                            <location />
                        </el-icon> -->
                        <span>{{ menu.name }}</span>
                    </template>
                    <!-- <el-menu-item-group title="Group One"> -->
                    <el-menu-item v-for="(child, c_index) in menu.children" :key="c_index" :index="child.path">
                        {{ child.name }}
                    </el-menu-item>
                </el-sub-menu>
            </el-menu>
        </el-col>
    </el-row>
</template>
<script lang="ts" setup>
import { computed, reactive } from 'vue';
import { fetchMenu } from '@/api/oauth';
import {
    Document,
    Menu as IconMenu,
    Location,
    Setting,
} from '@element-plus/icons-vue'
import router from '@/router';
console.log(router);
console.log(fetchMenu(), 'fetchMenu');


const menus = computed(() => {
    const menusRoutes = router.options.routes
        .filter(route => route?.meta?.menu)
        .map(route => ({
            name: route.meta?.title,
            children: route.children?.map(child => ({
                name: child.meta?.title, path: child.path
            }))
        }))
    return menusRoutes
})
// fetchMenu()
const handleOpen = (key: string, keyPath: string[]) => {
    console.log(key, keyPath, keyPath.length)
}
const handleClose = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
}
const handleSelect = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
    if (keyPath && keyPath.length && (keyPath.length > 1)) {
        console.log('routerpush');
        router.push(key)
    }
}
</script>
<style lang="scss" scope>
.aside-container {
    background: #545c64;
    width: 100%;
    height: 100%;

    .aside-logo {
        width: 100%;
        height: 82px;
        line-height: 82px;
        text-align: center;
        font-size: 1.75rem;
        color: white;
        letter-spacing: .1rem;
        text-shadow:
            .25rem .2rem 0 rgba($color: #368ade, $alpha: 0.5);
    }

    .aside-container-menu-block {
        border: none;
    }
}
</style>