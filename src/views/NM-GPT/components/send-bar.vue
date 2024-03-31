<template>
    <div class="send-bar-container">
        <div class="send-bar-block">
            <input :disabled="disabled" v-model="message" class="send-bar-input" @keyup.enter="send" />
            <div class="send-bar-button" :disabled="disabled">
                <svg viewBox="0 0 1024 1024" width="1.5rem" height="1.5rem">
                    <path
                        d="M871.04 89.770667L120.064 380.16a51.2 51.2 0 0 0-1.792 94.762667l303.36 130.56 131.072 303.957333a51.2 51.2 0 0 0 94.805333-1.877333l289.792-751.573334a51.2 51.2 0 0 0-66.261333-66.133333z m-41.130667 107.392l-231.978666 601.642666-97.962667-227.114666-3.584-7.338667a85.333333 85.333333 0 0 0-41.045333-37.248l-226.56-97.536 601.173333-232.405333z"
                        fill="#ffffff"></path>
                </svg>
            </div>
            <div v-if="disabled" class="send-bar-block-disabled"></div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const emits = defineEmits(['send'])
const message = ref('')
function send() {
    emits('send', message.value)
    message.value = ''
}
interface Props {
    disabled?: boolean
}
const props = defineProps<Props>()
</script>

<style scoped lang="scss">
.send-bar-container {
    padding: 1rem;
    width: 100%;
    height: 6rem;
    box-sizing: border-box;

    .send-bar-block {
        width: 100%;
        height: 100%;
        background: white;
        border-radius: 1rem;
        box-shadow: 0 .5rem .5rem rgba(0, 0, 0, 0.1);
        display: flex;
        align-items: center;
        padding: .5rem 1rem;
        box-sizing: border-box;
        position: relative;
        overflow: hidden;

        .send-bar-button {
            width: 2.5rem;
            height: 2.5rem;
            display: flex;
            align-items: center;
            justify-content: center;
            background: var(--el-color-primary);
            margin-left: auto;
            border-radius: .5rem;
            border: 1px solid white;
            box-shadow: 0 .25rem 1rem rgba(0, 0, 0, 0.3);
        }

        .send-bar-input {
            border: none;
            width: 100%;
            line-height: 1.5rem;
            font-size: 1rem;
            margin-right: 1rem;
        }

        .send-bar-block-disabled::before {
            content: '';
            position: absolute;
            width: 100%;
            height: 100%;
            cursor: no-drop;
            background: rgba(255, 255, 255, 0.5);
            left: 0;
            top: 0;
        }
    }
}
</style>