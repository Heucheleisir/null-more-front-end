<template>
    <div class="record-item-container">
        <div class="record-item-block">
            <div v-if="record.role === 'user'" class="record-item-box on-right">
                <div class="record-item-text">
                    <div class="record-item-nickname">{{ record.nickname }}</div>
                    <div v-if="record.type === 'text'">{{ record.text }}</div>
                    <div v-else-if="record.type === 'markdown'" v-html="viewHtml"></div>
                </div>
                <div class="record-item-avatar-block">
                    <img class="record-item-avatar-image" src="@/assets/images/avatar-user.png">
                </div>
            </div>
            <div v-else-if="record.role === 'ai'" class="record-item-box on-left">
                <div class="record-item-avatar-block">
                    <img class="record-item-avatar-image" src="@/assets/images/avatar-ai.png">
                </div>
                <div class="record-item-text">
                    <div class="record-item-nickname">{{ record.nickname }}</div>
                    <div v-if="record.type === 'text'">{{ record.text }}</div>
                    <div v-else-if="record.type === 'markdown'" v-html="viewHtml"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, reactive, watchEffect } from 'vue';
import MarkdownIt from 'markdown-it';
import mermaid from 'mermaid';
import mdHighlight from 'markdown-it-highlightjs';
import 'highlight.js/styles/default.css';
mermaid.initialize({});
const markdown = new MarkdownIt();
const pluginRenderList = reactive<{
    [key: string]: {
        [key: string]: {
            origin: string
            render: string
        }
    }
}>({
    mremaidPlugins: {}
})
markdown.use(mdHighlight)
markdown.use((markdownIt) => {
    markdownIt.core.ruler.push('mermaid', function (state) {

        const tokens = state.tokens;

        for (let i = 0; i < tokens.length; i++) {
            const mermaidDivId = `mremaidPlugins-${i}`;
            console.log(tokens[i], 'mremaidPlugins运算执行---------');
            if (tokens[i].info === 'mermaid') {
                const content = tokens[i].content
                const renderedHTML = `{{{mremaidPlugins-${i}}}}`;
                tokens[i].attrJoin('class', mermaidDivId);
                tokens[i].attrSet('id', mermaidDivId);
                tokens[i].content = renderedHTML;
                pluginRender(content, 'mremaidPlugins', mermaidDivId)
                console.log(renderedHTML, 'renderedHTMLrenderedHTMLrenderedHTML');
            }
        }
    });
});
function pluginRender(pluginStr: string, pluginType: string, pluginId: string) {
    if (pluginStr && pluginRenderList[pluginType]?.[pluginId]?.origin === pluginStr) {
        return
    }
    pluginRenderList[pluginType][pluginId] = {
        origin: pluginStr,
        render: pluginRenderList[pluginType]?.[pluginId]?.render || ''
    }
    requestAnimationFrame(async () => {
        // pluginRenderList[pluginType][pluginId] = pluginStr
        if (pluginStr && await mermaid.parse(pluginStr)) {
            const renderStr = await mermaid.render('mermaid-container-' + new Date().getTime(), pluginStr)
            pluginRenderList[pluginType][pluginId].render = renderStr.svg
        }
    })
}
const viewHtml = computed(() => {
    if (recordHtml.origin === porps.record.text) {
        return
    }
    return markdown.render(porps.record.text.split('\\n').join('\n'))
        .split(/{{{(.+?)}}}/g).map(renderItem => {
            const renderKeys = renderItem?.split('-')
            if (renderKeys?.[0]
                && pluginRenderList[renderKeys[0]]
                && pluginRenderList[renderKeys[0]][renderKeys[0] + '-' + renderKeys[1]]
            ) {
                return pluginRenderList[renderKeys[0]][renderKeys[0] + '-' + renderKeys[1]].render
            }
            return renderItem
        }).join('')
})
export interface RecordItemType {
    text: string
    role: 'user' | 'ai'
    type: 'markdown' | 'text'
    avatar?: string
    nickname?: string
}
interface Props {
    record: RecordItemType
}
const recordHtml = {
    origin: '',
    view: ''
}
const porps = defineProps<Props>()
watchEffect(() => {
    console.log(porps.record, 'record');
})
</script>

<style scoped lang="scss">
.record-item-container {
    padding: 2px;

    .record-item-block {
        width: 100%;
        padding: 1rem;
        box-sizing: border-box;

        .record-item-box {
            padding: .5rem;
            border-radius: 1rem;

            .record-item-avatar-block {
                display: inline-block;
                padding: 0 1rem;
                vertical-align: top;

                .record-item-avatar-image {
                    width: 3rem;
                    height: 3rem;
                    background: white;
                    border-radius: 4px;
                }
            }

            .record-item-text {
                position: relative;
                display: inline-block;
                background: white;
                padding: 1rem;
                vertical-align: top;
                border-radius: 1rem;
                max-width: calc(100% - 4rem - 15%);
                text-align: left;
                word-break: break-all;

                :deep(p) {
                    margin: 0;
                }

                .record-item-nickname {
                    position: absolute;
                    margin-top: -2.25rem;
                    margin-left: -.8rem;
                    font-size: .8rem;
                    white-space: nowrap;
                }
            }

            &.on-left {
                text-align: left
            }

            &.on-right {
                text-align: right;
            }
        }
    }
}
</style>