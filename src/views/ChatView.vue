<script setup>
import { computed, reactive, defineProps, toRefs } from 'vue';
//import { useRoute } from 'vue-router';

const messages = reactive([
    {
        id: 1,
        text: 'mensaje 1',
        author: 1
    },
    {
        id: 2,
        text: 'mensaje 2',
        author: 2
    },
    {
        id: 3,
        text: 'mensaje 3',
        author: 3
    },
]);

//const route = useRoute();

const props = defineProps({
    chatId: {
        type: String,
        default: ''
    }
});

const { chatId } = toRefs(props);

const filteredMessages = computed(() => {
    return messages.filter((m) => `${m.author}` === chatId.value);
});

</script>
<template>
    <div v-for="msg in filteredMessages" :key="msg.id">
        {{ msg.text }}
    </div>
</template>