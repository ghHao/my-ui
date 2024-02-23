<template>
<div class="page-content">
<!--    <a-collapse v-model:activeKey="activeKey" accordion destroyInactivePanel>-->
<!--        <a-collapse-panel v-for="(item,index) in componentsList" :key="index">-->
<!--            <template #header>-->
<!--                <div class="panel-content">-->
<!--                    <span class="panel-label"> {{ item.name }}</span>-->
<!--                    <template v-if="item.description">-->
<!--                        <span class="divider">—————</span>-->
<!--                        <span class="description">{{ item.description }}</span>-->
<!--                    </template>-->
<!--                </div>-->
<!--            </template>-->
<!--            <component :is="item.content"/>-->
<!--        </a-collapse-panel>-->
<!--    </a-collapse>-->
    <v-md-editor v-model="text" height="100%"></v-md-editor>
</div>
</template>

<script setup>
import components from "src"
import {onMounted, reactive, ref} from "vue";

// const activeKey = ref([]);
const componentsList = reactive([]);
const text = ref(`## tip

:::tip
这是一个 tip。这是一个 tip。这是一个 tip。这是一个 tip。这是一个 tip。这是一个 tip。
:::

## warning

:::warning
这是一个 warning，**这是一个 warning，**。
这是一个 warning。
这是一个 warning，这是一个 warning，这是一个 warning，这是一个 warning。
:::

## demo

demo 这是一个 demo。这是一个 demo。这是一个 demo。这是一个 demo。这是一个 demo。这是一个 demo。这是一个 demo。这是一个 demo。

\`\`\`html
<sq-button></sq-button>
\`\`\`
`)
onMounted(() => {
    for (let key in components) {
        const component = components[key];
        if (typeof component !== "function") {
            componentsList.push({
                name: component.name,
                description: component?.description || '',
                content: component
            })
        }
    }
})
</script>

<style lang="less" scoped>
.page-content {
    width: 100%;
    height: 100%;
    padding: 10px 20px;
}

.panel-content {
    width: 100%;
    display: flex;
    align-items: center;
    
    .panel-label {
        font-size: 14px;
        font-weight: bold;
        letter-spacing: 1px;
    }
    
    .divider {
        margin: 0 5px;
    }
    
    .description {
        color: #acb2bc;
        font-size: 14px;
        letter-spacing: 1px;
    }
}


</style>
