<template>
    <div class="dialogue-container">
        <!-- {{ chatServer.sseContent }} -->
        <div class="dialogue-chat-container" ref="dialogueChatContainer">
            <div class="dialogue-chat-tips">
                提示输入：
                <div class="dialogue-chat-tip-item" v-for="(item, index) in chatServer.testlink"
                    @click="handleSendMessage(item)">
                    {{ item }}
                </div>
            </div>
            <div v-for="(record, index) in chatServer.records" :key="index">
                <record-item :record="record">
                </record-item>
            </div>
        </div>
        <div class="dialogue-send-bar-container">
            <send-bar @send="handleSendMessage" :disabled="sendDisable" :inputDisable="inputDisable"></send-bar>
        </div>
    </div>
</template>

<script setup lang="ts">
import { chatTest, ChatSse } from '@/api/NM-GPT';
import { computed, nextTick, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
import RecordItem, { RecordItemType } from './components/record-item.vue';
import SendBar from './components/send-bar.vue';

const avatar_user = '@/assets/images/avatar-user.png'
const avatar_ai = '@/assets/images/avatar-ai.png'
const nickname_user = '我'
const nickname_ai = '充满智慧的AI(目光如炬)'
const dialogueChatContainer = ref<HTMLDivElement | null>(null)
const route = useRoute()
const chatServer = reactive<{
    sseServer: null | ChatSse
    sseStatus: 'ready' | 'init' | 'connect' | 'success' | 'fail' | 'disconnect' | 'close' | 'continue'
    sseContent: string
    records: Array<RecordItemType>
    testlink: Array<string>
}>({
    sseServer: null,
    sseStatus: 'ready',
    sseContent: '',
    records: [],
    testlink: ['查看', '时序图', 'js代码', 'java代码']
})
const sendDisable = computed<boolean>(() => {
    return chatServer.sseStatus === 'connect' || chatServer.sseStatus === 'continue'
})
const inputDisable = computed<boolean>(() => {
    return chatServer.sseStatus === 'connect' || chatServer.sseStatus === 'continue'
})
function handleSendMessage(message: string) {
    handleGenerateItem({
        role: 'user',
        text: message,
        type: 'text',
        avatar: avatar_user,
        nickname: nickname_user,
    })
    chatConnect(message)
}
function handleGenerateItem(record: RecordItemType): RecordItemType {
    chatServer.records.push(record)
    nextTick(() => { handleScrollBottom() })
    return chatServer.records[chatServer.records.length - 1]
}
function handleScrollBottom() {
    if (dialogueChatContainer?.value?.scrollHeight && dialogueChatContainer?.value?.clientHeight) {
        dialogueChatContainer.value.scrollTop = dialogueChatContainer.value.scrollHeight - dialogueChatContainer.value.clientHeight
    }
}
function chatConnect(message: string) {
    const recordItem = handleGenerateItem({
        role: 'ai',
        text: '',
        type: 'markdown',
        avatar: avatar_ai,
        nickname: nickname_ai
    })
    if (route.name === 'FETCH') {
        chatServer.sseServer = chatTest({ message: message }, 'Fetch')
    } else {
        chatServer.sseServer = chatTest({ message: message })
    }
    chatServer.sseServer?.then((chatSubStr) => {
        recordItem.text += chatSubStr.data
        handleScrollBottom()
    }).addStatusListener((status) => {
        chatServer.sseStatus = status
    })
}
function init() {
    handleSendMessage('您好！')
}
init()
</script>

<style scoped lang="scss">
.dialogue-container {
    width: 100%;
    height: 100%;
    background: #f5f5f5;
    position: relative;

    .dialogue-chat-container {
        cursor: pointer;
        width: 100%;
        height: calc(100% - 2.5rem);
        overflow: auto;
        overflow-x: hidden;
        padding-bottom: 3rem;
        box-sizing: border-box;

        .dialogue-chat-tips {
            padding: 1rem;

            .dialogue-chat-tip-item {
                display: inline-block;
                margin: 0 1rem;
                color: var(--el-color-primary);
                cursor: pointer;
            }
        }
    }

    .dialogue-send-bar-container {
        position: absolute;
        bottom: 1rem;
        z-index: 1;
        width: 100%;
    }
}
</style>