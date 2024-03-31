<template>
    <div class="home-welcome-container">
        <div class="home-welcome-platform">
            <div class="home-welcome-platform-logo">
                N
            </div>
        </div>
        <div class="home-welcome-background">
            <div class="home-welcome-background-box" v-for="(item, index) in background.block">
                <div v-if="item.type === 'block'" class="background-block"
                    :style="`color: ${item.color};background: ${item.background};`">
                    {{ item.text }}
                </div>
                <div v-else-if="item.type === 'text'" class="background-text"
                    :style="`color: ${item.color};background: ${item.background};`">
                    {{ item.text }}
                </div>
                <div v-else-if="item.type === 'image'" class="background-image">
                    <img :src="item.src" />
                </div>
            </div>
        </div>
        <div class="home-welcome-box">
            welcome
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { colors, backgrouds, lorems } from './mock'
const types: Block['type'][] = ['text', 'block', 'block', 'block', 'block']
interface Block {
    type: 'text' | 'block',
    color: string,
    background: string,
    text: string
    src: string
}
const background = reactive<{
    block: Block[]
}>({
    block: []
})
function init() {
    for (let index = 0; index < 256; index++) {
        background.block.push({
            type: randomList(types),
            color: randomList(colors),
            background: randomList(backgrouds),
            text: randomList(lorems),
            src: ''
        })
    }
}
function randomList<T>(list: T[]): T {
    const min = 0
    const max = list.length - 1
    return list[Math.floor(Math.random() * (max - min + 1)) + min];
}
init()
</script>

<style scoped lang="scss">
.home-welcome-container {
    width: 100%;
    height: 100%;
    display: flex;
    font-size: 5rem;
    justify-content: center;
    align-items: center;
    position: relative;
    perspective: 1024px;

    .home-welcome-box {
        height: 6rem;
        animation: welcome 2s infinite;
        -webkit-box-reflect: below .1rem linear-gradient(transparent, transparent, #000);
    }

    .home-welcome-background {
        width: 500%;
        height: 500%;
        z-index: -2;
        font-size: 1rem;
        position: absolute;
        transform: rotate3d(1, 0, 0, 56deg);

        .home-welcome-background-box {
            display: inline-block;
            word-break: break-all;
            white-space: pre-wrap;

            .background-block {
                width: 400px;
                height: 100px;
                overflow: hidden;
            }

            .background-text {}
        }
    }

    .home-welcome-platform {
        width: 512px;
        height: 512px;
        position: absolute;
        z-index: -1;
        // background: #333333;
        background: #a4a2a2;
        border-radius: 24px;
        transform: rotate3d(1, 0, 0, 56deg);
        display: flex;
        justify-content: center;
        align-items: center;
        box-shadow:
            1rem .75rem 1rem rgba(0, 0, 0, .75);

        .home-welcome-platform-logo {
            width: 4rem;
            height: 4rem;
            color: white;
            border-radius: 2rem;
            font-size: 2rem;
            border-left: .25rem solid #E6E6E6;
            border-right: .25rem solid #E6E6E6;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
}

@keyframes welcome {
    0% {
        transform: scale(1) translateY(-2.5rem);
    }

    50% {
        transform: scale(1.25) translateY(-2.75rem);
    }

    100% {
        transform: scale(1) translateY(-2.5rem);
    }
}
</style>