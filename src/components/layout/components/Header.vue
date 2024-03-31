<template>
    <div class="header-container">
        <div class="header-mask-container">
            <div class="header-mask-text-container">
                null-more
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
</script>
<style lang="scss" scope>
.header-container {
    width: 100%;
    height: 100%;
    background: red;
    box-sizing: border-box;
    overflow: hidden;
    background: url('@/assets/images/header.png');
    background-size: cover;
    background-position: center;

    .header-mask-container {
        width: 100%;
        height: 100%;
        background: rgba($color: #000000, $alpha: .4);
    }

    .header-mask-text-container {
        width: 100%;
        height: 100%;
        font-size: 3.5rem;
        letter-spacing: .25rem;
        // transform: scaleY(1.25);
        // transform: scaleX(1.25);
        font-weight: bolder;
        text-stroke: 1px rgba($color: #fff, $alpha: .8);
        -webkit-text-stroke: 1px rgba($color: #fff, $alpha: .8);
        -moz-text-stroke: 1px rgba($color: #fff, $alpha: .8);
        -ms-text-stroke: 1px rgba($color: #fff, $alpha: .8);
        display: flex;
        align-items: center;
        justify-content: center;
        color: transparent;
        background: url('@/assets/images/header.png');
        background-size: cover;
        background-position: center;
        background-clip: text;
    }
}
</style>