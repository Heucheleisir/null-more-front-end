<template>
    <div>
        <div class="main-button-container" @mouseenter="() => { changeType === 'hover' && handleChangeStatus() }"
            v-if="!bubbleButton.activatedState">
            <div v-if="!bubbleButton.onAction">
                <slot name="button">
                    <el-button class="main-button-block" type="info">
                        {{ buttonName }}
                    </el-button>
                </slot>
            </div>
            <div class="main-button-block main-penetrate-block">
                <div v-for="(item, index) in bubbleButton.bubbleList" :key="item.bubbleId" class="bubble-block"
                    :style="`background: ${bubbleColor || 'var(--el-color-primary)'};${item?.actionStyle}`"></div>
            </div>
        </div>
        <slot v-else></slot>
    </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
type ChangeType = 'hover' | 'click'
interface BubbleItem {
    bubbleId: string
    actionStyle: string
}
interface Props {
    changeType: ChangeType
    buttonName?: string
    bubbleColor?: string
    disabled?: boolean
}
const props = defineProps<Props>();
const bubbleButton = reactive({
    activatedState: false,
    onAction: false,
    bubbleList: [] as Array<BubbleItem>
})
function handleChangeStatus(keepAlive?: boolean) {
    if (props.disabled) { return }
    initBubbleList(8)
    if (keepAlive) { return }
    bubbleButton.onAction = true
    setTimeout(() => {
        bubbleButton.activatedState = true
    }, 1000);
}
function initBubbleList(length: number) {
    bubbleButton.bubbleList.length = 0
    for (let index = 0; index < length; index++) {
        const bubbleItem: BubbleItem = reactive({ actionStyle: '', bubbleId: `${new Date().getTime()}_${index}` })
        bubbleButton.bubbleList.push(bubbleItem)
        setTimeout(() => {
            bubbleItem.actionStyle = `top: ${Math.floor(Math.random() * 10) + 1}0%;`
                + `left: ${Math.floor(Math.random() * 10) + 1}0%;transform: scale(0);`
        }, 100)
    }
}
defineExpose({
    handleChangeStatus
})
</script>

<style lang="scss" scoped>
.main-button-container {
    width: 100%;
    height: 100%;
    min-height: 2rem;
    position: relative;

    .main-button-block {
        width: 100%;
        height: 100%;
        min-height: 2rem;
        position: absolute;
        top: 0;
        left: 0;

        .bubble-block {
            position: absolute;
            top: calc(50% - 0.5rem);
            left: calc(50% - 0.5rem);
            width: 1rem;
            height: 1rem;
            border-radius: .5rem;
            transition: 1.2s;
            transform: scale(1);
        }
    }

    .main-penetrate-block {
        pointer-events: none;
        z-index: -1;
    }
}
</style>