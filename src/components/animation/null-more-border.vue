<template>
    <div class="NM-border-container">
        <div class="NM-border-content-block">
            <div style="border-radius: 1rem;overflow: hidden;">
                <slot></slot>
            </div>
        </div>
        <div class="NM-border-border-block-container">
            <div class="NM-border-border-block" :class="[lighting && 'NM-border-border-block-lighting']">
            </div>
            <svg width="100%" height="100%">
                <defs>
                    <!-- 创建一个滤镜，这里使用高斯模糊滤镜 -->
                    <filter id="blurFilter">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="0.8" />
                    </filter>
                    <!-- 创建一个蒙版，只保留边框 -->
                    <mask id="borderMask">
                        <rect x="0" y="0" width="100%" height="100%" fill="white" rx="1rem" ry="1rem" /> <!-- 白色背景 -->
                        <rect x="2" y="2" width="calc(100% - 4px)" height="calc(100% - 4px)" rx="1rem" ry="1rem"
                            fill="black" />
                    </mask>
                </defs>
            </svg>
        </div>
    </div>
</template>

<script setup lang="ts">
interface Props {
    // 使用外发光属性需要给出背景颜色
    lighting?: string
}
defineProps<Props>()
</script>

<style scoped lang="scss">
.NM-border-container {
    width: 100%;
    height: 100%;
    position: relative;
    box-sizing: border-box;

    .NM-border-content-block {
        overflow: hidden;
        border-radius: 1rem;
        box-sizing: border-box;
        padding: 2px;
    }

    .NM-border-border-block-container {
        width: 100%;
        height: 100%;
        top: 0;
        position: absolute;
        box-sizing: border-box;

        .NM-border-border-block {
            width: 100%;
            height: 100%;
            border-radius: 1rem;
            mask: url(#borderMask);
            // filter: url(#blurFilter);
        }

        .NM-border-border-block-lighting {
            mask: none
        }

        .NM-border-border-block::before {
            content: '';
            width: 100%;
            height: 100%;
            inset: 0;
            z-index: -1;
            position: absolute;
            border-radius: 1rem;
            background: repeating-conic-gradient(from var(--light-deg),
                    red,
                    orange,
                    yellow,
                    cyan,
                    blue,
                    purple,
                    green,
                    pink,
                    lightblue,
                    darkred);
            animation: border-rotating 4s linear infinite;
        }

        .NM-border-border-block::after {
            content: '';
            width: 100%;
            height: 100%;
            inset: 0;
            z-index: -1;
            position: absolute;
            border-radius: 1rem;
            filter: blur(.8rem);
            background: repeating-conic-gradient(from var(--light-deg),
                    red,
                    orange,
                    yellow,
                    cyan,
                    blue,
                    purple,
                    green,
                    pink,
                    lightblue,
                    darkred);
            animation: border-rotating 4s linear infinite;
        }
    }
}

@property --light-deg {
    syntax: '<angle>';
    inherits: false;
    initial-value: 0deg;
}

@keyframes border-rotating {
    0% {
        --light-deg: 0deg
    }

    100% {
        --light-deg: 360deg
    }
}
</style>