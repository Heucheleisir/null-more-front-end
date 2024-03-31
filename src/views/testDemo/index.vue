<template>
    <basic-container>
        <avue-crud ref="crud" v-model="page.form" :option="page.option" @row-save="rowSave" @row-update="rowUpdate"
            @row-del="rowDel" :data="page.tableData">
            <template #menu-left="{ size }">
                <el-button type="primary" :size="size">导入</el-button>
            </template>
        </avue-crud>
    </basic-container>
</template>
<script setup lang="ts">
import { ref, reactive, getCurrentInstance } from 'vue'
import TestDemo from './testDemoModel'
import { fetch, addObj, editObj } from '@/api/testDemo';
import BasicContainer from '@/components/layout/components/basic-container.vue';
//获取this
// let { proxy } = getCurrentInstance()
const page = reactive({
    form: {} as any,
    option: {
        index: true,
        column: [{
            label: '字段1',
            prop: 'testDemo1'
        }, {
            label: '字段2',
            prop: 'testDemo2'
        }, {
            label: '字段3',
            prop: 'testDemo3'
        }, {
            label: '字段4',
            prop: 'testDemo4'
        }, {
            label: '字段5',
            prop: 'testDemo5'
        }]
    },
    tableData: [] as TestDemo[]
})
function rowSave(row: TestDemo, done, loading) {
    addObj(row).then((res) => {
        console.log('res', res)
        done(row)
    })
}
function rowDel(row: TestDemo, index, done) {
    done(row)
}
function rowUpdate(row: TestDemo, index, done, loading) {
    editObj(row).then((res) => {
        console.log('res', res)
        done(row)
        init()
    })
}
function init() {
    fetch().then((res) => {
        console.log('res', res)
        page.tableData = res.data?.data || []
    })
}
init()
</script>