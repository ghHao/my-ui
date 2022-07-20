<template>
    <div class="tags-box" @click="focusInput">
        <a-tag
            size="mini"
            type="info"
            color="processing"
            style="margin-right: 2px;margin-bottom: 1px;"
            v-for="tag in tagsList"
            :key="tag"
            closable
            :disable-transitions="false"
            @close="deleteTags(tag)">
            {{tag}}
        </a-tag>
        <a-input
            size="mini"
            ref="tagInputRef"
            v-model:value="tagValue"
            style="width: 180px;"
            placeholder="请输入"
            @blur="handleInputConfirm"
            @keyup.enter="handleInputConfirm"
        >
        </a-input>
    </div>
    <div class="footer">
        <a-button type="primary" html-type="submit" @click="save">保存</a-button>
        <a-button style="margin-left: 10px" @click="cancel">取消</a-button>
    </div>
</template>
<script>
import {computed, ref} from "vue";
import {message} from 'ant-design-vue';

export default {
    name: 'tagsInput',
    props: ['list', 'type'],
    emits: ["getTags"],
    setup (props, {emit}) {
        const tagInputRef = ref(undefined);
        // 输入框的值
        const tagValue = ref('');
        // 标签列表
        const tagsList = computed(() => {
            try {
                return JSON.parse(props.list) || [];
            } catch (error) {
                return props?.list?.length === 0 ? [] : [props.list];
            }
        });
        const ruleType = ref(props.type ?? 'Ip');
        // 校验规则
        const rulesMap = {
            Ip: /^((?:(?:25[0-5]|2[0-4]\d|[01]?\d?\d)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d?\d))$/,
            Email: ''
        };

        const methods = {
            // 聚焦输入框
            focusInput () {
                tagInputRef.value.focus();
            },

            // 删除标签
            deleteTags (tag) {
                tagsList.value.splice(tagsList.value.indexOf(tag), 1);
            },

            // 确定输入框的值
            handleInputConfirm (flag) {
                if (!tagValue.value || tagValue.value === "") {
                    if (flag) {
                        emit('ok', tagsList.value);
                    }
                    return false;
                }
                const str = tagValue.value.trim().replace(/(;$)|(；$)/g, '');
                if (methods.checkRules(str)) {
                    if (tagsList.value.indexOf(str) !== -1) {
                        message.warning(`${ruleType.value}已存在`);
                    } else {
                        tagsList.value.push(str);
                        tagValue.value = "";
                        emit('getTags', tagsList);
                        if (flag) {
                            emit('ok', tagsList.value);
                        }
                    }
                } else {
                    message.warning(`输入${ruleType.value}格式错误`);
                }
            },

            // 取消
            cancel () {
                emit('cancel');
            },
            // 确认
            save () {
                methods.handleInputConfirm(true);
            },

            // 判断字符串是否为一个有效IP地址
            checkRules (val) {
                const rules = rulesMap[ruleType.value];
                return rules.test(val);
            }
        };

        return {
            tagsList,
            tagValue,
            tagInputRef,
            ruleType,
            rulesMap,
            ...methods
        };
    },

};
</script>
<style lang="less" scoped>
.tags-box {
    display: flex;
    margin-top: 4px;
    padding: 1px;
    flex-wrap: wrap;
    border-radius: 5px;
    box-sizing: border-box;
    align-items: center;
    border: 1px solid #d9d9d9;
    min-height: 32px;
    cursor: text;

    &:hover {
        border-color: #268DFF !important;
    }

    .ant-input {
        height: 28px;
        border: none !important;
    }
}

.footer {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    margin-top: 25px;
}
</style>
