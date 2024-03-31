<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>
<script setup lang="ts">
import { ref, reactive } from 'vue'
const appPage = reactive({
    name: 'NM'
})
console.log(appPage.name, 'appPage');
</script>
<style>
body{
    margin: 0;
}
</style>