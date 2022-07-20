<template>
    <div class="hello">
        <tags-input :list="JSON.stringify(['192.168.2.3'])" :type="'Ip'"></tags-input>
    </div>
</template>

<script>
import tagsInput from '@/components/tagsInput';

export default {
    name: 'HelloWorld',
    components: {tagsInput},
    props: {
        msg: String
    },
};
</script>

<style scoped>

</style>
