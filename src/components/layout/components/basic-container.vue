<template>
    <div class="basic-container">
        <el-card style="border-radius: .5rem;">
            <slot></slot>
        </el-card>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.basic-container {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 1rem;
    background: #F5F5F5;
}
</style>