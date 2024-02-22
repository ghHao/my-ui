<template>
<button
    :class="{ 'is-disabled': disabled }"
    :disabled="disabled"
    class="ts-button"
>
    <span><slot>测试按钮</slot></span>
</button>
</template>
<script>
export default {
    name: "TsButton", // 注意这个name是必须的
    description: "按钮测试1",
    props: {
        disabled: {
            type: Boolean,
            default: false,
        },
    },
};
</script>
<style lang="less">
.ts-button {
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    background: #fff;
    border: 1px solid #dcdfe6;
    color: #606266;
    -webkit-appearance: none;
    text-align: center;
    box-sizing: border-box;
    outline: none;
    margin: 0;
    transition: 0.1s;
    font-weight: 500;
    user-select: none;
    padding: 12px 20px;
    font-size: 14px;
    border-radius: 4px;
    
    &:focus,
    &:hover {
        color: #409eff;
        border-color: #c6e2ff;
        background-color: #ecf5ff;
    }
    
    &.is-disabled,
    &.is-disabled:focus,
    &.is-disabled:hover {
        color: #c0c4cc;
        cursor: not-allowed;
        background-image: none;
        background-color: #fff;
        border-color: #ebeef5;
    }
}
</style>